import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchErrorAppAlert, spliceArray, executeAfterDelay } from "../Functions/utility";
import { metaDataActions } from "../Redux/Slices/MetaDataSlice";
import { acceptInvite, declineInvite, fetchAllInvites, fetchInvite } from "../Functions/invite";
import { useWebsocket } from "../Context/WebsocketProvider";
import { APP_CONTEXT, QUICK_STYLES, BACKGROUND_PATHS, CUSTOM_STYLES as S } from "../Utils/constants";
import GameIcons from "../Components/GameIcons";
import Confirmation from "../UI/Confirmation";
import ColorPicker from "../UI/ColorPicker";

const Invites = () => {
  const [focusedTileIdx, setFocusedTileIdx] = useState(0);
  const [invites, setInvites] = useState([]);
  const [animationPaused, setAnimationPaused] = useState(false);
  const [declineConfirmationOpen, setDeclineConfirmationOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [noColorSelected, setNoColorSelected] = useState(false);
  const ws = useWebsocket();
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ws || !userData?.username) return;

    const unsub = ws.subscribe(
      `/topic/invites/to/${userData.username}`,
      fetchNewInvite
    );

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [ws, userData.username]);

  useEffect(() => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );
    const fetchInvitesHandler = async () => {
      try {
        const invites = await fetchAllInvites();
        setInvites(invites.inviteSummaries);
      }
      catch (err) {
        dispatchErrorAppAlert(dispatch, err, APP_CONTEXT.invites, true);
      }
      finally {
        dispatch(
          metaDataActions.toggleLoading({ value: false })
        );
      }
    }
    fetchInvitesHandler();
  }, []);

  const fetchNewInvite = async (msg) => {
    try {
      const newInvite = await fetchInvite(msg.gameId);
      setInvites(invites => [...invites, ...newInvite.inviteSummaries]);
    }
    catch (err) {
      dispatchErrorAppAlert(dispatch, err, APP_CONTEXT.invites, true);
    }
  }

  const acceptInviteHandler = async () => {
    if (!selectedColor) {
      setNoColorSelected(true);
      executeAfterDelay(2000, setNoColorSelected, [false]);
      return
    }
    setColorPickerOpen(false);
    const selectedInvite = invites[focusedTileIdx];
    try {
      await acceptInvite(selectedInvite.inviteId, selectedColor);
      const invitesCpy = (() => [...invites])();
      spliceArray('delete', invitesCpy, focusedTileIdx);
      setInvites(invitesCpy);
      ws.send(`/invite/to/game/${selectedInvite.gameId}/from/${selectedInvite.owner}/to/${userData.username}/accepted`);
    }
    catch (err) {
      dispatchErrorAppAlert(dispatch, err, APP_CONTEXT.invites, true);
    }
    finally {
      setAnimationPaused(false);
    }
  }

  const declineInviteHandler = async () => {
    setDeclineConfirmationOpen(false);
    const selectedInvite = invites[focusedTileIdx];
    try {
      await declineInvite(selectedInvite.inviteId);
      const invitesCpy = (() => [...invites])();
      spliceArray('delete', invitesCpy, focusedTileIdx);
      setInvites(invitesCpy);
    }
    catch (err) {
      dispatchErrorAppAlert(dispatch, err, APP_CONTEXT.invites, true);
    }
    finally {
      setAnimationPaused(false);
    }
  }

  const clickHandler = (event, action) => {
    if (action === 'accept') {
      setAnimationPaused(true);
      setColorPickerOpen(true);
    }
    if (action === 'decline') {
      setAnimationPaused(true);
      setDeclineConfirmationOpen(true);
    }
  }

  return (
    <div className="bg-[rgba(43,26,9,0.7)] backdrop-blur-md shadow-lg p-20 w-screen h-screen flex justify-around">
      {
        invites.length > 0 ?
          <GameIcons
            games={invites}
            clickHandler={clickHandler}
            context={APP_CONTEXT.invites}
            animationPaused={animationPaused}
            setFocusedTileIdx={setFocusedTileIdx}
            focusedTileIdx={focusedTileIdx}
            buttons={{
              a: {
                name: 'Accept',
                args: ['accept'],
                ...QUICK_STYLES.yesButton
              },
              b: {
                name: 'Decline',
                args: ['decline'],
                ...QUICK_STYLES.noButton
              }
            }}
          />
          :
          <p className="text-5xl text-center font-yatra text-white">No Invites</p>
      }

      {
        declineConfirmationOpen
        &&
        <Confirmation
          background={BACKGROUND_PATHS.stone}
          confirmationButtonName={"Decline Invite"}
          confirmationCallback={declineInviteHandler}
          cancelCallback={() => { setDeclineConfirmationOpen(false); setAnimationPaused(false) }}
          confirmationText={[`Are you sure you want to decline this invite?`]}
        />
      }
      {
        colorPickerOpen
        &&
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          noColorSelected={noColorSelected}
          background={BACKGROUND_PATHS.stone}
          buttons={{
            a: {
              name: 'Close',
              callback: () => {setAnimationPaused(false); setColorPickerOpen(false)},
              styles: [S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]
            },
            b: {
              name: 'Accept',
              callback: acceptInviteHandler,
              styles: [S.button.classicCatanButtonSingle, S.border.lightRedBorder]
            },
          }}
        />
      }
    </div>
  )
}

export default Invites;