// generator client {
//     provider = "prisma-client-js"
//   }
  
//   datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL")
//   }
  
//   model Account {
//     id                String  @id @default(cuid())
//     userId            String
//     type              String
//     provider          String
//     providerAccountId String
//     refresh_token     String? @map("refreshToken")
//     access_token      String? @map("accessToken")
//     expires_at        Int?    @map("expiresAt")
//     token_type        String?
//     scope             String?
//     id_token          String?
//     session_state     String?
//     user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
//     @@unique([provider, providerAccountId])
//   }
  
//   model User {
//     id            String    @id @default(cuid())
//     name          String?
//     email         String?   @unique
//     emailVerified DateTime?
//     image         String?
//     passwordHash  String
//     accounts      Account[]
//     member        Member?
//     sessions      Session[]
//   }
  
//   model Session {
//     id           String   @id @default(cuid())
//     sessionToken String   @unique
//     userId       String
//     expires      DateTime
//     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   }
  
//   model VerificationToken {
//     identifier String
//     token      String   @unique
//     expires    DateTime
//   }
  
//   model Member {
//     id          String   @id @default(cuid())
//     userId      String   @unique
//     name        String
//     gender      String
//     dateOfBirth DateTime
//     created     DateTime @default(now())
//     updated     DateTime @default(now())
//     description String
//     city        String
//     country     String
//     image       String?
//     sourceLikes Like[]   @relation("source")
//     targetLikes Like[]   @relation("target")
//     user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//     photos      Photo[]
//     senderMessages Message[] @relation("sender")
//     recipientMessages Message[] @relation("recipient")
//   }
  
//   model Photo {
//     id       String  @id @default(cuid())
//     url      String
//     publicId String?
//     memberId String
//     member   Member  @relation(fields: [memberId], references: [id], onDelete: Cascade)
//   }
  
//   model Like {
//     sourceUserId String
//     targetUserId String
//     sourceMember Member @relation("source", fields: [sourceUserId], references: [userId], onDelete: Cascade)
//     targetMember Member @relation("target", fields: [targetUserId], references: [userId], onDelete: Cascade)
  
//     @@id([sourceUserId, targetUserId])
//   }
//   model Message{
//     id String @id @default(cuid())
//     text String
//     created DateTime @default(now())
//     senderId String
//     recipientId String
//   sender Member @relation("sender",fields: [senderId],references: [userId],onDelete:Cascade)
//   recipient Member @relation("recipient",fields: [recipientId],references: [userId],onDelete:Cascade)
//   dateRead DateTime?
//   seberDeleted Boolean @default(false)
//   recipientDeleted Boolean @default(false)
  
//   }





// generator client {
//     provider = "prisma-client-js"
//   }
  
//   datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL")
//   }
  
//   model Account {
//     id                String  @id @default(cuid())
//     userId            String
//     type              String
//     provider          String
//     providerAccountId String
//     // refresh_token     String? @map("refreshToken")
//     // access_token      String? @map("accessToken")
//     // expires_at        Int?    @map("expiresAt")
//     refresh_token     String? @map("refreshToken")  // Correct mapping to `refreshToken`
//     access_token      String? @map("accessToken")   // Correct mapping to `accessToken`
//     expires_at        Int?    @map("expiresAt")      // Correct mapping to `expiresAt`
//     token_type        String?
//     scope             String?
//     id_token          String?
//     session_state     String?
//     user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
//     @@unique([provider, providerAccountId])
//   }
  
//   model User {
//     id            String    @id @default(cuid())
//     name          String?
//     email         String?   @unique
//     emailVerified DateTime?
//     image         String?
//     passwordHash  String
//     accounts      Account[]
//     member        Member?
//     sessions      Session[]
//   }
  
//   model Session {
//     id           String   @id @default(cuid())
//     sessionToken String   @unique
//     userId       String
//     expires      DateTime
//     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   }
  
//   model VerificationToken {
//     identifier String
//     token      String   @unique
//     expires    DateTime
//   }
  
//   model Member {
//     id          String   @id @default(cuid())
//     userId      String   @unique
//     name        String
//     gender      String
//     dateOfBirth DateTime
//     created     DateTime @default(now())
//     updated     DateTime @default(now())
//     description String
//     city        String
//     country     String
//     image       String?
//     sourceLikes Like[]   @relation("source")
//     targetLikes Like[]   @relation("target")
//     user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//     photos      Photo[]
//     senderMessages Message[] @relation("sender")
//     recipientMessages Message[] @relation("recipient")
//   }
  
//   model Photo {
//     id       String  @id @default(cuid())
//     url      String
//     publicId String?
//     memberId String
//     member   Member  @relation(fields: [memberId], references: [id], onDelete: Cascade)
//   }
  
//   model Like {
//     sourceUserId String
//     targetUserId String
//     sourceMember Member @relation("source", fields: [sourceUserId], references: [userId], onDelete: Cascade)
//     targetMember Member @relation("target", fields: [targetUserId], references: [userId], onDelete: Cascade)
  
//     @@id([sourceUserId, targetUserId])
//   }
//   model Message{
//     id String @id @default(cuid())
//     text String
//     created DateTime @default(now())
//     senderId String
//     recipientId String
//   sender Member @relation("sender",fields: [senderId],references: [userId],onDelete:Cascade)
//   recipient Member @relation("recipient",fields: [recipientId],references: [userId],onDelete:Cascade)
//   dateRead DateTime?
//   sederDeleted Boolean @default(false)
//   recipientDeleted Boolean @default(false)
  
//   }