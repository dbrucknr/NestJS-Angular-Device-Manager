nest new device-manager --skip-git (I selected pnpm as package manager)
pnpm i @nestjs/typeorm typeorm sqlite3
pnpm approve-builds
nest g resource devices
pnpm i class-transformer class-validator
pnpm i @nestjs/swagger swagger-ui-express
pnpm approve-builds
pnpm i @nestjs/serve-static (For custom Swagger UI)
pnpm i @nestjs/event-emitter (For capturing entity events)
