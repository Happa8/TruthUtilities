import * as v from "valibot";

const CredientialsSchema = v.object({
  id: v.string(),
  username: v.string(),
  acct: v.string(),
  display_name: v.string(),
  locked: v.boolean(),
  bot: v.boolean(),
  discoverable: v.boolean(),
  group: v.boolean(),
  created_at: v.string(),
  note: v.string(),
  url: v.string(),
  avatar: v.string(),
  avatar_static: v.string(),
  header: v.string(),
  header_static: v.string(),
  followers_count: v.number(),
  following_count: v.number(),
  statuses_count: v.number(),
  last_status_at: v.string(),
  verified: v.boolean(),
  location: v.string(),
  website: v.string(),
  accepting_messages: v.boolean(),
  chats_onboarded: v.boolean(),
  feeds_onboarded: v.boolean(),
  tv_onboarded: v.boolean(),
  bookmarks_onboarded: v.boolean(),
  show_nonmember_group_statuses: v.boolean(),
  pleroma: v.object({
    accepts_chat_messages: v.boolean(),
    settings_store: v.object({
      soapbox_fe: v.object({
        chats: v.object({
          sound: v.boolean(),
          mainWindow: v.string(),
        }),
        locale: v.string(),
        themeMode: v.string(),
        boostModal: v.boolean(),
        autoPlayGif: v.boolean(),
        deleteModal: v.boolean(),
        displayMedia: v.string(),
        autoPlayVideo: v.boolean(),
        notifications: v.object({
          quickFilter: v.object({
            active: v.string(),
          }),
        }),
        missingDescriptionModal: v.boolean(),
      }),
    }),
  }),
  tv_account: v.boolean(),
  receive_only_follow_mentions: v.boolean(),
  source: v.object({
    privacy: v.string(),
    sensitive: v.boolean(),
    language: v.union([v.string(), v.null()]),
    email: v.string(),
    approved: v.boolean(),
    note: v.string(),
    fields: v.array(v.any()),
    sms_verified: v.boolean(),
    ready_by_sms_verification: v.boolean(),
    follow_requests_count: v.number(),
    accepting_messages: v.boolean(),
    chats_onboarded: v.boolean(),
    feeds_onboarded: v.boolean(),
    tv_onboarded: v.boolean(),
    bookmarks_onboarded: v.boolean(),
    show_nonmember_group_statuses: v.boolean(),
    unauth_visibility: v.boolean(),
    integrity: v.number(),
    integrity_status: v.array(v.any()),
    sms_reverification_required: v.boolean(),
    sms: v.boolean(),
    sms_country: v.union([v.string(), v.null()]),
    receive_only_follow_mentions: v.boolean(),
    email_verified: v.boolean(),
    accepted_status_edit_prompt: v.boolean(),
    unapproved_position: v.number(),
  }),
  features: v.object({
    for_you: v.boolean(),
    tv: v.boolean(),
  }),
  tv_token: v.string(),
  emojis: v.array(v.any()),
  fields: v.array(v.any()),
});

export const getVerifyCredentials = async (accessToken: string) => {
  return fetch("https://truthsocial.com/api/v1/accounts/verify_credentials", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(async (res) => {
    const result = await res.json();
    console.log(result);
    const parsed = await v.parse(CredientialsSchema, result);
    return parsed;
  });
};
