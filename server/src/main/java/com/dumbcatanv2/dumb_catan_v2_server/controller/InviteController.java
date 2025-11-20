package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateInviteRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.ApiResponse;
import com.dumbcatanv2.dumb_catan_v2_server.service.InviteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invite")
@RequiredArgsConstructor
public class InviteController {

   private final InviteService inviteService;

    @PostMapping
    public ResponseEntity<ApiResponse> createInvite(@RequestBody CreateInviteRequest req){
        ApiResponse res = inviteService.createInvite(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}