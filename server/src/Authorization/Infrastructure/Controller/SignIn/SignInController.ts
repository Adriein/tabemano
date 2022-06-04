import { Body, Controller, Post } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInResponse } from "Authorization/Application/SignIn/SignInResponse";
import { SignInApiRequest } from "Authorization/Infrastructure/Controller/SignIn/SignInApiRequest";
import { SignInApiResponse } from "Authorization/Infrastructure/Controller/SignIn/SignInApiResponse";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

@Controller('/signin')
export class SignInController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post()
  public async signIn(
    @Body() body: SignInApiRequest
  ): Promise<void> {
    const query = SignInQuery.fromJson(body);
    const response = await this.queryBus.execute<SignInQuery, SignInResponse>(query);
  }
}