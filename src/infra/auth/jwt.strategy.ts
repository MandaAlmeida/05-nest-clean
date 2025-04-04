import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { z } from "zod";
import { EnvService } from "../env/env.service";

const UserPayload = z.object({
    sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof UserPayload>

@Injectable()
// Autentificacao do usuario pelo token
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: EnvService) {
        const publicKey = config.get("JWT_PUBLIC_KEY")
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(publicKey, "base64"),
            algorithms: ["RS256"]
        })
    }

    async validate(playload: UserPayload) {
        return UserPayload.parse(playload)
    }
}