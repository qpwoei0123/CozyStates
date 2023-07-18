package com.example.server.likes.controller;

import com.example.server.content.service.ContentServiceImpl;
import com.example.server.likes.service.LikesServiceImpl;
import com.example.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
@Validated
@Slf4j
public class LikeController {
    public final LikesServiceImpl likesService;
    public final ContentServiceImpl contentService;
    public final MemberService memberService;
    
    @PatchMapping("/{content-id}")
    synchronized public ResponseEntity<?> patchlike(@Positive @PathVariable("content-id") Long contentId,
                                       HttpServletRequest request){

        return likesService.patchLike(contentId, request);
    }
}
