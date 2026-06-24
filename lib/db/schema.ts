import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
} from "drizzle-orm/pg-core"

// ---------- Better Auth tables ----------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

// ---------- App tables ----------
export const contactRequest = pgTable("contact_request", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const subscriber = pgTable("subscriber", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("subscribed"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const message = pgTable("message", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  direction: text("direction").notNull().default("inbound"),
  fromAddr: text("fromAddr").notNull(),
  toAddr: text("toAddr").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  snippet: text("snippet"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const dmarcReport = pgTable("dmarc_report", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  domain: text("domain").notNull(),
  sourceIp: text("sourceIp").notNull(),
  count: integer("count").notNull().default(1),
  disposition: text("disposition").notNull().default("none"),
  dkim: text("dkim").notNull().default("pass"),
  spf: text("spf").notNull().default("pass"),
  reportDate: timestamp("reportDate").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})
