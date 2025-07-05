package com.upgrad.ecommerce.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserInfoResponse {
  private String id;
  private String email;
  private List<String> roles;

  public UserInfoResponse(String id, String email, List<String> roles) {
    this.id = id;
    this.email = email;
    this.roles = roles;
  }
}
