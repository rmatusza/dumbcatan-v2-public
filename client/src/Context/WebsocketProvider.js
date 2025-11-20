// WebsocketProvider.js
import { createContext, useRef, useState, useEffect, useCallback, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebsocketCtx = createContext();

export function WebsocketProvider({ token, username, children }) {
    const clientRef = useRef(null);
    const [connected, setConnected] = useState(false);

    /// NOTE: this code is for making the ws handshake
/// -> it is a regular http request that asks the server to upgrade to WebSocket
/// -> connectHeaders in the STOMP client only affects STOMP frames, not the initial handshake which is why connectHeaders is commented out but left it here
///    to see the correct syntax for sending connect headers over ws
/// -> NOTE: workaround 1 is to add the token as a request parameter / query string
/// -> NOTE: workaround 2 ( WHAT I'M USING ) is to not authenticate during the handshake and to first allow the connection to be established
///          -> after connection is established and stomp messages can be sent, client sends an authentication stomp message containing the jwt token
///          -> server uses token to establish a session based on users credentials in jwt - otherwise it terminates the session and disconnects
    useEffect(() => {
        if (!token || !username) return;

        const client = new Client({
            webSocketFactory: () => new SockJS(`http://localhost:8080/dumb-catan-ws`),
            // connectHeaders: {
            //   Authorization: 'Bearer ' + token
            // },
            debug: str => console.log('[STOMP]', str),
            reconnectDelay: 5000, // retry if connection drops
            onConnect: () => {
                client.subscribe(`/user/${username}/queue/errors`, (message) => {
                    console.error("WebSocket Error: ", message.body);
                });
                client.publish({
                    destination: "/dumb-catan-ws/authenticate",
                    body: JSON.stringify({ token }),
                });
                setConnected(true);
                console.log('🟢 Connected to WebSocket');
            },
            onDisconnect: () => {
                setConnected(false);
                console.log('🔴 Disconnected');
            },
            onStompError: frame => {
                console.error('❌ Broker Error:', frame.headers['message']);
                console.error('Details:', frame.body);
            },
            onWebSocketClose: event => {
                console.log('🔌 WebSocket closed', event);
            },
        });
       
        clientRef.current = client;

        client.activate();

        return () => {
            setConnected(false);
            if (clientRef.current?.deactivate) clientRef.current.deactivate();
            clientRef.current = null;
        };
    }, [token, username]);

    const send = useCallback((endpoint, message, headers = null, token = null) => {
        const c = clientRef.current;
        if (!c?.connected) return;
        c.publish({
            destination: `/dumb-catan-ws${endpoint}`,
            headers,
            body: message !== null ? JSON.stringify(message) : '',
        });
    }, []);

    const subscribe = useCallback((destination, cb) => {
        const c = clientRef.current;
        if (!c?.connected) {
            console.warn('Tried to subscribe before connection; will no-op.');
            return () => { };
        }
        const sub = c.subscribe(destination, (msg) => {
            try {
                cb(msg.body ? JSON.parse(msg.body) : null, msg);
            } catch {
                cb(msg.body, msg);
            }
        });
        return () => sub.unsubscribe();
    }, []);

    const disconnect = useCallback(async () => {
        if (clientRef.current?.deactivate) {
            await clientRef.current.deactivate();
        }
        setConnected(false);
    }, []);

    return (
        <WebsocketCtx.Provider value={{ connected, send, subscribe, disconnect, client: clientRef.current }}>
            {children}
        </WebsocketCtx.Provider>
    );
};

export function useWebsocket() {
    const ctx = useContext(WebsocketCtx);
    if (!ctx) throw new Error('useWebsocket must be used within a WebsocketProvider');
    return ctx;
};