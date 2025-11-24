package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateInviteRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.ApiResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.InviteResponse;
import com.dumbcatanv2.dumb_catan_v2_server.security.CustomUserDetails;
import com.dumbcatanv2.dumb_catan_v2_server.service.InviteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/invite")
@RequiredArgsConstructor
public class InviteController {

   private final InviteService inviteService;

    @PostMapping
    public ResponseEntity<ApiResponse> createInvite(@Valid @RequestBody CreateInviteRequest req){
        return ResponseEntity.status(HttpStatus.CREATED).body(inviteService.createInvite(req));
    }

    @PostMapping("/{inviteId}/accept")
    public ResponseEntity<Void> acceptInvite(@PathVariable int inviteId, @RequestParam String playerColor, @AuthenticationPrincipal CustomUserDetails principal){
        inviteService.accept(inviteId, principal.getUserId(), playerColor);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{inviteId}/decline")
    public ResponseEntity<Void> deleteInvite(@PathVariable int inviteId){
        inviteService.decline(inviteId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me/all")
    public ResponseEntity<InviteResponse> fetchAllInvites(@AuthenticationPrincipal CustomUserDetails principal){
        return ResponseEntity.ok(inviteService.fetchAll(principal.getUserId()));
    }

    @GetMapping("/for/game/{gameId}")
    public ResponseEntity<InviteResponse> fetchInvite(@PathVariable int gameId, @AuthenticationPrincipal CustomUserDetails principal){
        return ResponseEntity.ok(inviteService.fetchOne(gameId, principal.getUserId()));
    }
}