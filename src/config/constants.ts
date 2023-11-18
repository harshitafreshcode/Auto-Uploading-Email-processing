export class Constants {
    public static readonly ERROR_CODES = {
      UNAUTHORIZED_CODE: 401, // for token expire
      NOT_FOUND_CODE: 404, // data not found
      SUCCESS_CODE: 200, // every success request
      FAIL_CODE: 400, // every failed request
      USER_EXISTS: 409,
      REQUIRE_PARAMETER: 422,
      CREATE_SUCCESS_CODE: 201
    };
    public static readonly ERROR_MESSAGES = {
      USER_ID_NOT_FOUND: "Not Found - User id was not found",
      USER_NOT_FOUND : "User Not Found",
      DATA_NOT_FOUND: "Not Found - Data",
      AUTHORIZATION_REQUIRED: "Authorization required",
      AUTHORIZATION_TOKEN_INVALID: 'Invalid Authorization token',
      AUTHORIZATION_TOKEN_EXPIRED: "Authorization token expired",
      AUTHORIZATION_TOKEN_INVALID_WITH_USERID: "Authorization token not associated with this User Id"
    };
    public static readonly SUCCESS_MESSAGE = {
      OK: "Ok",
      CREATED: "Created"
    };
  
    public static readonly LUNGUAGE_SORT = {
      EN: "en"
    };
  
    public static readonly FIELDS = {
      PAGE_NO: "page-no",
      PAGE_SIZE: "page-search-limit"
    };
  
    public static readonly VALIDATON_ERROR_MESSAGES = {
      NOT_VALID: "is not valid.",
      REQUIRED: "is require."
    };
  
    public static readonly ERROR_TYPES = {
      MISSING_REQUEST_PARAMETER: "MissingRequiredParameterError",
      ASSET_ID_AND_MESUREMENT_ITEM_SET_ID_EXIST:
        "AssetIdandItemsetIdAlreadyExistError",
      FIELD_NOT_VALID: "FieldValidationError",
      DATA_NOT_FOUND: "DataNotFoundError",
      USER_ID_EXIST: "UserIdAlreadyExistError"
    };
  
    public static readonly TABLES = {
      CMS: "cms_pages",
      COUPONS: "coupons",
      CTREELS: "ct_reels",
      CONTACT_US: "contact_us",
      USER_ORDERS:"user_orders",
      USER_ORDERS_DETAILS:"user_order_details",
      GUIDE_COUNTRY: "guide_countries",
      CONTRIBUTOR: "contributor",
      GUIDE_RATING: "guide_ratings",
      GUIDE_LIKE: "guide_likes",
      GUIDE_COMMENT: "guide_comments",
      GUIDE_COMMENT_REPORT_SPAM: "guide_comment_report_spam",
      TAGS: "tags",
      FAQS: "faqs",
      FCMTOKEN:"fcm_tokens",
      ORDER_CANCEL: "order_cancel_reason_master",
      LOCATION: "location_masters",
      SHOWS: "originals",
      SEASON_EPISODES: "original_season_episodes",
      SEASON: "original_seasons",
      BLOGS: "blogs",
      GUIDE_CITY: "guid_cities",
      DEAL_CITY: "deal_cities",
      LOCATION_COUNTRY: "location_countries",
      LOCATION_STATE: "location_states",
      LOCATION_CITY: "location_cities",
      SOCIALS: "socials",
      SOCIAL_COMMENTS: "social_comments",
      DEAL_CATEGORY: "deals_categories",
      BLOG_CATEGORY: "blog_categories",
      DEALS: "deals",
      DEALS_VARIENTS: "deals_varients",
      DEAL_PARTNER: "deals_partner",
      GUIDE: "guides",
      ORIGINAL_T: "original_trending_episodes",
      POPULAR_ORIGINAL: "original_popular_episodes",
      GUIDE_CATEGORIES: "guide_categories",
      INTERESTS: "interests",
      BLOG_COMMENTS: "blog_comments",
      REEL_COMMENTS: "reel_comments",
      ORIGINAL_COMMENTS: "original_comments",
      guide_comment_report_spams: "guide_comment_report_spams",
      original_comment_report_spams: "original_comment_report_spams",
      reel_comment_report_spams: "reel_comment_report_spams",
      social_comment_report_spams: "social_comment_report_spams",
      blog_comment_report_spam:"blog_comment_report_spam",
      USER:"user",
      Social_subscribe:"social_subscribe"
  
    };
  
  }
  