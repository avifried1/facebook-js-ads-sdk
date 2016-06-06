"use strict";function FacebookError(e){this.name="FacebookError",this.message=e.message,this.stack=(new Error).stack}var babelHelpers={};babelHelpers["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},babelHelpers.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},babelHelpers.createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),babelHelpers.get=function e(t,i,a){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,i);if(void 0===n){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,i,a)}if("value"in n)return n.value;var r=n.get;if(void 0!==r)return r.call(a)},babelHelpers.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},babelHelpers.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},babelHelpers.toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)};var Http=function(){function e(){babelHelpers.classCallCheck(this,e)}return babelHelpers.createClass(e,null,[{key:"request",value:function(t,i,a){return"undefined"!=typeof window&&window.XMLHttpRequest?e.xmlHttpRequest(t,i,a):e.request_promise(t,i,a)}},{key:"xmlHttpRequest",value:function(e,t,i){return new Promise(function(a,n){var s=new window.XMLHttpRequest;s.open(e,t),s.onload=function(){try{var e=JSON.parse(s.response);200===s.status?a(e):n({body:e,status:s.status})}catch(t){n({body:s.responseText,status:s.status})}},s.setRequestHeader("Content-Type","application/json"),s.setRequestHeader("Accept","application/json"),s.send(JSON.stringify(i))})}},{key:"request_promise",value:function(e,t,i){var a=require("request-promise"),n={method:e,uri:t,json:!0,headers:{"User-Agent":"Facebook-JS-Ads-SDK/"+FacebookAdsApi.VERSION}};return i&&(n.body=i),a(n)["catch"](function(e){throw e={body:e.error?e.error:e,status:e.statusCode}})}}]),e}();FacebookError.prototype=Object.create(Error.prototype),FacebookError.prototype.constructor=FacebookError;var FacebookRequestError=function(e){function t(e,i,a,n){babelHelpers.classCallCheck(this,t);var s=e.body.error,r=s.error_user_msg?s.error_user_title+": "+s.error_user_msg:s.message,_=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,r));return _.name="FacebookRequestError",_.message=r,_.status=e.status,_.response=e.body,_.method=i,_.url=a,n&&(_.data=n),_}return babelHelpers.inherits(t,e),t}(FacebookError),FacebookAdsApi=function(){function e(t){var i=arguments.length<=1||void 0===arguments[1]?"en_US":arguments[1];if(babelHelpers.classCallCheck(this,e),!t)throw new Error("Access token required");this.accessToken=t,this.locale=i,this._debug=!1}return babelHelpers.createClass(e,null,[{key:"VERSION",get:function(){return"v2.6"}},{key:"GRAPH",get:function(){return"https://graph.facebook.com"}}]),babelHelpers.createClass(e,[{key:"setDebug",value:function(e){return this._debug=e,this}},{key:"call",value:function(t,i){var a,n=this,s=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];if("POST"===t||"PUT"===t){var r=s;s={}}return"string"==typeof i||i instanceof String?a=i:(a=[e.GRAPH,e.VERSION].concat(babelHelpers.toConsumableArray(i)).join("/"),s.access_token=this.accessToken,a+="?"+e._encode_params(s)),Http.request(t,a,r).then(function(e){return n._debug&&console.log("200 "+t+" "+a+" "+(r?JSON.stringify(r):"")),Promise.resolve(e)})["catch"](function(e){throw n._debug&&console.log(e.status+" "+t+" "+a+" "+(r?JSON.stringify(r):"")),new FacebookRequestError(e,t,a,r)})}}],[{key:"init",value:function(e,t){var i=new this(e,t);return this.setDefaultApi(i),i}},{key:"setDefaultApi",value:function(e){this._defaultApi=e}},{key:"getDefaultApi",value:function(){return this._defaultApi}},{key:"_encode_params",value:function(e){return Object.keys(e).map(function(t){var i=e[t];return"object"===("undefined"==typeof i?"undefined":babelHelpers["typeof"](i))&&(i=i?JSON.stringify(i):""),encodeURIComponent(t)+"="+encodeURIComponent(i)}).join("&")}}]),e}(),AbstractObject=function(){function e(){var t=this;if(babelHelpers.classCallCheck(this,e),this._data={},void 0===this.constructor.Fields)throw new Error('A "Fields" frozen object must be defined in the object class');this._fields=Object.keys(this.constructor.Fields),this._fields.forEach(function(e){t._defineProperty(e)})}return babelHelpers.createClass(e,[{key:"_defineProperty",value:function(e){var t=this;Object.defineProperty(this,e,{get:function(){return t._data[e]},set:function(i){t._data[e]=i},enumerable:!0})}},{key:"set",value:function(e,t){return this._fields.indexOf(e)<0&&this._defineProperty(e),this[e]=t,this}},{key:"setData",value:function(e){var t=this;return Object.keys(e).forEach(function(i){t.set(i,e[i])}),this}},{key:"exportData",value:function(){return this._data}}]),e}(),AbstractCrudObject=function(e){function t(e,i,a){babelHelpers.classCallCheck(this,t);var n=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return n._parentId=i,n._api=a||FacebookAdsApi.getDefaultApi(),e&&babelHelpers.get(Object.getPrototypeOf(t.prototype),"setData",n).call(n,e),n}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"_defineProperty",value:function(e){var t=this;void 0===this._changes&&(this._changes={}),Object.defineProperty(this,e,{get:function(){return t._data[e]},set:function(i){t._changes[e]=i,t._data[e]=i},enumerable:!0})}},{key:"setData",value:function(e){var i=this;return babelHelpers.get(Object.getPrototypeOf(t.prototype),"setData",this).call(this,e),Object.keys(e).forEach(function(e){delete i._changes[e]}),this}},{key:"exportData",value:function(){return this._changes}},{key:"clearHistory",value:function(){return this._changes={},this}},{key:"getId",value:function(){if(!this.id)throw new Error(this.constructor.name+" Id not defined");return this.id}},{key:"getParentId",value:function(){if(!this._parentId)throw new Error(this.constructor.name+" parentId not defined");return this._parentId}},{key:"getNodePath",value:function(){return this.getId()}},{key:"getApi",value:function(){var e=this._api;if(!e)throw new Error(this.constructor.name+' does not yet have an associated api object.\n\n        Did you forget to instantiate an API session with: "FacebookAdsApi.init"?');return e}},{key:"read",value:function(e){var t=this,i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=this.getApi(),n=[this.getNodePath()];return e&&(i.fields=e.join(",")),new Promise(function(e,s){a.call("GET",n,i).then(function(i){return e(t.setData(i))})["catch"](s)})}},{key:"create",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=this.getApi(),a=[this.getParentId(),this.constructor.getEndpoint()];return t=Object.assign(t,this.exportData()),new Promise(function(n,s){i.call("POST",a,t).then(function(t){return n(e.setData(t))})["catch"](s)})}},{key:"update",value:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=this.getApi(),i=[this.getNodePath()];return e=Object.assign(e,this.exportData()),new Promise(function(a,n){t.call("POST",i,e).then(function(e){return a(e)})["catch"](n)})}},{key:"delete",value:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=this.getApi(),i=[this.getNodePath()];return e=Object.assign(e,this.exportData()),new Promise(function(a,n){t.call("DELETE",i,e).then(function(e){return a(e)})["catch"](n)})}},{key:"save",value:function(e){return this.id?this.update(e):this.create(e)}},{key:"getEdge",value:function(e,t){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],a=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],n=arguments[4];t&&(i.fields=t.join(","));var s=this,r=new Cursor(s,e,i,n);return a?r.next():r}}],[{key:"getByIds",value:function(e,t){var i=this,a=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=arguments[3];return n=n||FacebookAdsApi.getDefaultApi(),t&&(a.fields=t.join(",")),a.ids=e.join(","),new Promise(function(e,t){return n.call("GET",[""],a).then(function(t){var a=[];for(var n in t){var s=t[n],r=new i(s);a.push(r)}e(a)})["catch"](t)})}}]),t}(AbstractObject),Cursor=function(e){function t(e,i,a,n){babelHelpers.classCallCheck(this,t);var s=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,0)),r=[e.getId()];return r.push(n||i.getEndpoint()),s._api=e.getApi(),s._targetClass=i,s.paging={next:r},s.summary,s.clear=function(){s.length=0},s.set=function(e){s.clear(),s.push.apply(s,babelHelpers.toConsumableArray(e))},s.next=function(){return s.hasNext()?s._loadPage(s.paging.next):Promise.reject(new RangeError("end of pagination"))},s.hasNext=function(){return Boolean(s.paging)&&Boolean(s.paging.next)},s.previous=function(){return s.hasPrevious()?s._loadPage(s.paging.previous):Promise.reject(new RangeError("start of pagination"))},s.hasPrevious=function(){return Boolean(s.paging)&&Boolean(s.paging.previous)},s._loadPage=function(e){var t=new Promise(function(t,i){s._api.call("GET",e,a).then(function(e){var i=s._buildObjectsFromResponse(e);s.set(i),s.paging=e.paging,s.summary=e.summary,t(s)})["catch"](i)});return a&&(a=void 0),t},s._buildObjectsFromResponse=function(e){return e.data.map(function(e){return new s._targetClass(e,void 0,s._api)})},s}return babelHelpers.inherits(t,e),t}(Array),AdPreview=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,null,[{key:"getEndpoint",value:function(){return"previews"}},{key:"Fields",get:function(){return Object.freeze({body:"body"})}},{key:"AdFormat",get:function(){return Object.freeze({right_column_standard:"RIGHT_COLUMN_STANDARD",desktop_feed_standard:"DESKTOP_FEED_STANDARD",mobile_feed_standard:"MOBILE_FEED_STANDARD",mobile_feed_basic:"MOBILE_FEED_BASIC",mobile_interstitial:"MOBILE_INTERSTITIAL",mobile_banner:"MOBILE_BANNER",mobile_medium_rectangle:"MOBILE_MEDIUM_RECTANGLE",mobile_native:"MOBILE_NATIVE",instagram_standard:"INSTAGRAM_STANDARD",audience_network_outstream_video:"AUDIENCE_NETWORK_OUTSTREAM_VIDEO"})}}]),t}(AbstractCrudObject),AdCreative=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getPreviews",value:function(e,t,i){return this.getEdge(AdPreview,e,t,i)}}],[{key:"getEndpoint",value:function(){return"adcreatives"}},{key:"Fields",get:function(){return Object.freeze({actor_id:"actor_id",actor_image_hash:"actor_image_hash",actor_image_url:"actor_image_url",actor_name:"actor_name",adlabels:"adlabels",applink_treatment:"applink_treatment",body:"body",call_to_action_type:"call_to_action_type",id:"id",image_crops:"image_crops",image_hash:"image_hash",image_url:"image_url",instagram_actor_id:"instagram_actor_id",instagram_permalink_url:"instagram_permalink_url",instagram_story_id:"instagram_story_id",link_og_id:"link_og_id",link_url:"link_url",name:"name",object_id:"object_id",object_story_id:"object_story_id",object_story_spec:"object_story_spec",object_type:"object_type",object_url:"object_url",platform_customizations:"platform_customizations",product_set_id:"product_set_id",run_status:"run_status",template_url:"template_url",thumbnail_url:"thumbnail_url",title:"title",url_tags:"url_tags",action_spec:"action_spec",call_to_action:"call_to_action",dynamic_ad_voice:"dynamic_ad_voice",follow_redirect:"follow_redirect",image_file:"image_file",object_instagram_id:"object_instagram_id",place_page_set_id:"place_page_set_id",video_id:"video_id"})}},{key:"ApplinkTreatment",get:function(){return Object.freeze({deeplink_with_web_fallback:"deeplink_with_web_fallback",deeplink_with_appstore_fallback:"deeplink_with_appstore_fallback",web_only:"web_only"})}},{key:"CallToActionType",get:function(){return Object.freeze({open_link:"OPEN_LINK",like_page:"LIKE_PAGE",shop_now:"SHOP_NOW",play_game:"PLAY_GAME",install_app:"INSTALL_APP",use_app:"USE_APP",install_mobile_app:"INSTALL_MOBILE_APP",use_mobile_app:"USE_MOBILE_APP",book_travel:"BOOK_TRAVEL",listen_music:"LISTEN_MUSIC",watch_video:"WATCH_VIDEO",learn_more:"LEARN_MORE",sign_up:"SIGN_UP",download:"DOWNLOAD",watch_more:"WATCH_MORE",no_button:"NO_BUTTON",call_now:"CALL_NOW",buy_now:"BUY_NOW",get_offer:"GET_OFFER",get_offer_view:"GET_OFFER_VIEW",get_directions:"GET_DIRECTIONS",message_page:"MESSAGE_PAGE",subscribe:"SUBSCRIBE",sell_now:"SELL_NOW",donate_now:"DONATE_NOW",get_quote:"GET_QUOTE",contact_us:"CONTACT_US",record_now:"RECORD_NOW",vote_now:"VOTE_NOW",open_movies:"OPEN_MOVIES"})}},{key:"ObjectType",get:function(){return Object.freeze({application:"APPLICATION",domain:"DOMAIN",event:"EVENT",offer:"OFFER",page:"PAGE",photo:"PHOTO",share:"SHARE",status:"STATUS",store_item:"STORE_ITEM",video:"VIDEO",invalid:"INVALID",action_spec:"ACTION_SPEC",instagram_media:"INSTAGRAM_MEDIA"})}},{key:"RunStatus",get:function(){return Object.freeze({active:"ACTIVE",deleted:"DELETED"})}},{key:"DynamicAdVoice",get:function(){return Object.freeze({dynamic:"DYNAMIC",story_owner:"STORY_OWNER"})}},{key:"Operator",get:function(){return Object.freeze({all:"ALL",any:"ANY"})}}]),t}(AbstractCrudObject),Insights=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,null,[{key:"getEndpoint",value:function(){return"insights"}},{key:"Fields",get:function(){return Object.freeze({account_id:"account_id",account_name:"account_name",action_values:"action_values",actions:"actions",ad_id:"ad_id",ad_name:"ad_name",adset_id:"adset_id",adset_name:"adset_name",age:"age",app_store_clicks:"app_store_clicks",buying_type:"buying_type",call_to_action_clicks:"call_to_action_clicks",campaign_id:"campaign_id",campaign_name:"campaign_name",canvas_avg_view_percent:"canvas_avg_view_percent",canvas_avg_view_time:"canvas_avg_view_time",clicks:"clicks",cost_per_10_sec_video_view:"cost_per_10_sec_video_view",cost_per_action_type:"cost_per_action_type",cost_per_estimated_ad_recallers:"cost_per_estimated_ad_recallers",cost_per_inline_link_click:"cost_per_inline_link_click",cost_per_inline_post_engagement:"cost_per_inline_post_engagement",cost_per_total_action:"cost_per_total_action",cost_per_unique_action_type:"cost_per_unique_action_type",cost_per_unique_click:"cost_per_unique_click",cost_per_unique_inline_link_click:"cost_per_unique_inline_link_click",country:"country",cpc:"cpc",cpm:"cpm",cpp:"cpp",ctr:"ctr",date_start:"date_start",date_stop:"date_stop",deeplink_clicks:"deeplink_clicks",estimated_ad_recall_rate:"estimated_ad_recall_rate",estimated_ad_recallers:"estimated_ad_recallers",frequency:"frequency",frequency_value:"frequency_value",gender:"gender",hourly_stats_aggregated_by_advertiser_time_zone:"hourly_stats_aggregated_by_advertiser_time_zone",hourly_stats_aggregated_by_audience_time_zone:"hourly_stats_aggregated_by_audience_time_zone",impression_device:"impression_device",impressions:"impressions",inline_link_click_ctr:"inline_link_click_ctr",inline_link_clicks:"inline_link_clicks",inline_post_engagement:"inline_post_engagement",newsfeed_avg_position:"newsfeed_avg_position",newsfeed_clicks:"newsfeed_clicks",newsfeed_impressions:"newsfeed_impressions",objective:"objective",place_page_id:"place_page_id",place_page_name:"place_page_name",placement:"placement",product_id:"product_id",reach:"reach",region:"region",relevance_score:"relevance_score",social_clicks:"social_clicks",social_impressions:"social_impressions",social_reach:"social_reach",social_spend:"social_spend",spend:"spend",total_action_value:"total_action_value",total_actions:"total_actions",total_unique_actions:"total_unique_actions",unique_actions:"unique_actions",unique_clicks:"unique_clicks",unique_ctr:"unique_ctr",unique_impressions:"unique_impressions",unique_inline_link_click_ctr:"unique_inline_link_click_ctr",unique_inline_link_clicks:"unique_inline_link_clicks",unique_link_clicks_ctr:"unique_link_clicks_ctr",unique_social_clicks:"unique_social_clicks",unique_social_impressions:"unique_social_impressions",video_10_sec_watched_actions:"video_10_sec_watched_actions",video_15_sec_watched_actions:"video_15_sec_watched_actions",video_30_sec_watched_actions:"video_30_sec_watched_actions",video_avg_pct_watched_actions:"video_avg_pct_watched_actions",video_avg_sec_watched_actions:"video_avg_sec_watched_actions",video_complete_watched_actions:"video_complete_watched_actions",video_p100_watched_actions:"video_p100_watched_actions",video_p25_watched_actions:"video_p25_watched_actions",video_p50_watched_actions:"video_p50_watched_actions",video_p75_watched_actions:"video_p75_watched_actions",video_p95_watched_actions:"video_p95_watched_actions",website_clicks:"website_clicks",website_ctr:"website_ctr"})}},{key:"ActionAttributionWindows",get:function(){return Object.freeze({value_1d_view:"1d_view",value_7d_view:"7d_view",value_28d_view:"28d_view",value_1d_click:"1d_click",value_7d_click:"7d_click",value_28d_click:"28d_click",value_default:"default"})}},{key:"ActionBreakdowns",get:function(){return Object.freeze({action_carousel_card_id:"action_carousel_card_id",action_carousel_card_name:"action_carousel_card_name",action_destination:"action_destination",action_device:"action_device",action_target_id:"action_target_id",action_type:"action_type",action_video_type:"action_video_type"})}},{key:"ActionReportTime",get:function(){return Object.freeze({impression:"impression",conversion:"conversion"})}},{key:"Breakdowns",get:function(){return Object.freeze({age:"age",country:"country",gender:"gender",frequency_value:"frequency_value",hourly_stats_aggregated_by_advertiser_time_zone:"hourly_stats_aggregated_by_advertiser_time_zone",hourly_stats_aggregated_by_audience_time_zone:"hourly_stats_aggregated_by_audience_time_zone",impression_device:"impression_device",place_page_id:"place_page_id",placement:"placement",placement_merge_rhc:"placement_merge_rhc",product_id:"product_id",region:"region"})}},{key:"DatePreset",get:function(){return Object.freeze({today:"today",yesterday:"yesterday",last_3_days:"last_3_days",this_week:"this_week",last_week:"last_week",last_7_days:"last_7_days",last_14_days:"last_14_days",last_28_days:"last_28_days",last_30_days:"last_30_days",last_90_days:"last_90_days",this_month:"this_month",last_month:"last_month",this_quarter:"this_quarter",last_3_months:"last_3_months",lifetime:"lifetime"})}},{key:"Level",get:function(){return Object.freeze({ad:"ad",adset:"adset",campaign:"campaign",account:"account"})}},{key:"SummaryActionBreakdowns",get:function(){return Object.freeze({action_carousel_card_id:"action_carousel_card_id",action_carousel_card_name:"action_carousel_card_name",action_destination:"action_destination",action_device:"action_device",action_target_id:"action_target_id",action_type:"action_type",action_video_type:"action_video_type"})}},{key:"Summary",get:function(){return Object.freeze({id:"id",account_id:"account_id",async_percent_completion:"async_percent_completion",async_status:"async_status",date_start:"date_start",date_stop:"date_stop",emails:"emails",friendly_name:"friendly_name",is_bookmarked:"is_bookmarked",is_running:"is_running",schedule_id:"schedule_id",time_completed:"time_completed",time_ref:"time_ref"})}}]),t}(AbstractCrudObject),Ad=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getAdCreatives",value:function(e,t,i){return this.getEdge(AdCreative,e,t,i)}},{key:"getInsights",value:function(e,t,i){return this.getEdge(Insights,e,t,i)}}],[{key:"getEndpoint",value:function(){return"ads"}},{key:"Fields",get:function(){return Object.freeze({account_id:"account_id",ad_review_feedback:"ad_review_feedback",adlabels:"adlabels",adset:"adset",adset_id:"adset_id",bid_amount:"bid_amount",bid_info:"bid_info",bid_type:"bid_type",campaign:"campaign",campaign_id:"campaign_id",configured_status:"configured_status",conversion_specs:"conversion_specs",created_time:"created_time",creative:"creative",effective_status:"effective_status",id:"id",last_updated_by_app_id:"last_updated_by_app_id",name:"name",recommendations:"recommendations",status:"status",tracking_specs:"tracking_specs",updated_time:"updated_time",date_format:"date_format",display_sequence:"display_sequence",execution_options:"execution_options",redownload:"redownload",filename:"filename"})}},{key:"BidType",get:function(){return Object.freeze({cpc:"CPC",cpm:"CPM",multi_premium:"MULTI_PREMIUM",absolute_ocpm:"ABSOLUTE_OCPM",cpa:"CPA"})}},{key:"ConfiguredStatus",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",archived:"ARCHIVED"})}},{key:"EffectiveStatus",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",pending_review:"PENDING_REVIEW",disapproved:"DISAPPROVED",preapproved:"PREAPPROVED",pending_billing_info:"PENDING_BILLING_INFO",campaign_paused:"CAMPAIGN_PAUSED",archived:"ARCHIVED",adset_paused:"ADSET_PAUSED"})}},{key:"Status",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",archived:"ARCHIVED"})}},{key:"DatePreset",get:function(){return Object.freeze({today:"today",yesterday:"yesterday",last_3_days:"last_3_days",this_week:"this_week",last_week:"last_week",last_7_days:"last_7_days",last_14_days:"last_14_days",last_28_days:"last_28_days",last_30_days:"last_30_days",last_90_days:"last_90_days",this_month:"this_month",last_month:"last_month",this_quarter:"this_quarter",last_3_months:"last_3_months",lifetime:"lifetime"})}},{key:"ExecutionOptions",get:function(){return Object.freeze({validate_only:"VALIDATE_ONLY",synchronous_ad_review:"SYNCHRONOUS_AD_REVIEW",include_recommendations:"INCLUDE_RECOMMENDATIONS"})}},{key:"Operator",get:function(){return Object.freeze({all:"ALL",any:"ANY"})}}]),t}(AbstractCrudObject),AdSet=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getAds",value:function(e,t,i){return this.getEdge(Ad,e,t,i)}},{key:"getInsights",value:function(e,t,i){return this.getEdge(Insights,e,t,i)}}],[{key:"getEndpoint",value:function(){return"adsets"}},{key:"Fields",get:function(){return Object.freeze({account_id:"account_id",adlabels:"adlabels",adset_schedule:"adset_schedule",bid_amount:"bid_amount",bid_info:"bid_info",billing_event:"billing_event",budget_remaining:"budget_remaining",campaign:"campaign",campaign_id:"campaign_id",configured_status:"configured_status",created_time:"created_time",creative_sequence:"creative_sequence",daily_budget:"daily_budget",effective_status:"effective_status",end_time:"end_time",frequency_cap:"frequency_cap",frequency_cap_reset_period:"frequency_cap_reset_period",frequency_control_specs:"frequency_control_specs",id:"id",is_autobid:"is_autobid",lifetime_budget:"lifetime_budget",lifetime_frequency_cap:"lifetime_frequency_cap",lifetime_imps:"lifetime_imps",name:"name",optimization_goal:"optimization_goal",pacing_type:"pacing_type",promoted_object:"promoted_object",recommendations:"recommendations",rf_prediction_id:"rf_prediction_id",rtb_flag:"rtb_flag",start_time:"start_time",status:"status",targeting:"targeting",updated_time:"updated_time",use_new_app_click:"use_new_app_click",daily_imps:"daily_imps",execution_options:"execution_options",redownload:"redownload"})}},{key:"BillingEvent",get:function(){return Object.freeze({app_installs:"APP_INSTALLS",clicks:"CLICKS",impressions:"IMPRESSIONS",link_clicks:"LINK_CLICKS",offer_claims:"OFFER_CLAIMS",page_likes:"PAGE_LIKES",post_engagement:"POST_ENGAGEMENT",video_views:"VIDEO_VIEWS"})}},{key:"ConfiguredStatus",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",archived:"ARCHIVED"})}},{key:"EffectiveStatus",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",pending_review:"PENDING_REVIEW",disapproved:"DISAPPROVED",preapproved:"PREAPPROVED",pending_billing_info:"PENDING_BILLING_INFO",campaign_paused:"CAMPAIGN_PAUSED",archived:"ARCHIVED",adset_paused:"ADSET_PAUSED"})}},{key:"OptimizationGoal",get:function(){return Object.freeze({none:"NONE",app_installs:"APP_INSTALLS",brand_awareness:"BRAND_AWARENESS",clicks:"CLICKS",engaged_users:"ENGAGED_USERS",external:"EXTERNAL",event_responses:"EVENT_RESPONSES",impressions:"IMPRESSIONS",lead_generation:"LEAD_GENERATION",link_clicks:"LINK_CLICKS",offer_claims:"OFFER_CLAIMS",offsite_conversions:"OFFSITE_CONVERSIONS",page_engagement:"PAGE_ENGAGEMENT",page_likes:"PAGE_LIKES",post_engagement:"POST_ENGAGEMENT",reach:"REACH",social_impressions:"SOCIAL_IMPRESSIONS",video_views:"VIDEO_VIEWS"})}},{key:"Status",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",archived:"ARCHIVED"})}},{key:"DatePreset",get:function(){return Object.freeze({today:"today",yesterday:"yesterday",last_3_days:"last_3_days",this_week:"this_week",last_week:"last_week",last_7_days:"last_7_days",last_14_days:"last_14_days",last_28_days:"last_28_days",last_30_days:"last_30_days",last_90_days:"last_90_days",this_month:"this_month",last_month:"last_month",this_quarter:"this_quarter",last_3_months:"last_3_months",lifetime:"lifetime"})}},{key:"ExecutionOptions",get:function(){return Object.freeze({validate_only:"VALIDATE_ONLY",synchronous_ad_review:"SYNCHRONOUS_AD_REVIEW",include_recommendations:"INCLUDE_RECOMMENDATIONS"})}},{key:"Operator",get:function(){return Object.freeze({all:"ALL",any:"ANY"})}}]),t}(AbstractCrudObject),Campaign=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getAds",value:function(e,t,i){return this.getEdge(Ad,e,t,i)}},{key:"getAdSets",value:function(e,t,i){return this.getEdge(AdSet,e,t,i)}},{key:"getInsights",value:function(e,t,i){return this.getEdge(Insights,e,t,i)}}],[{key:"getEndpoint",value:function(){return"campaigns"}},{key:"Fields",get:function(){return Object.freeze({account_id:"account_id",adlabels:"adlabels",buying_type:"buying_type",can_use_spend_cap:"can_use_spend_cap",configured_status:"configured_status",created_time:"created_time",effective_status:"effective_status",id:"id",name:"name",objective:"objective",recommendations:"recommendations",spend_cap:"spend_cap",start_time:"start_time",status:"status",stop_time:"stop_time",updated_time:"updated_time",execution_options:"execution_options",promoted_object:"promoted_object"})}},{key:"ConfiguredStatus",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",archived:"ARCHIVED"})}},{key:"EffectiveStatus",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",pending_review:"PENDING_REVIEW",disapproved:"DISAPPROVED",preapproved:"PREAPPROVED",pending_billing_info:"PENDING_BILLING_INFO",campaign_paused:"CAMPAIGN_PAUSED",archived:"ARCHIVED",adset_paused:"ADSET_PAUSED"})}},{key:"Status",get:function(){return Object.freeze({active:"ACTIVE",paused:"PAUSED",deleted:"DELETED",archived:"ARCHIVED"})}},{key:"DatePreset",get:function(){return Object.freeze({today:"today",yesterday:"yesterday",last_3_days:"last_3_days",this_week:"this_week",last_week:"last_week",last_7_days:"last_7_days",last_14_days:"last_14_days",last_28_days:"last_28_days",last_30_days:"last_30_days",last_90_days:"last_90_days",this_month:"this_month",last_month:"last_month",this_quarter:"this_quarter",last_3_months:"last_3_months",lifetime:"lifetime"})}},{key:"DeleteStrategy",get:function(){return Object.freeze({delete_any:"DELETE_ANY",delete_oldest:"DELETE_OLDEST",delete_archived_before:"DELETE_ARCHIVED_BEFORE"})}},{key:"ExecutionOptions",get:function(){return Object.freeze({validate_only:"VALIDATE_ONLY",synchronous_ad_review:"SYNCHRONOUS_AD_REVIEW",include_recommendations:"INCLUDE_RECOMMENDATIONS"})}},{key:"Objective",get:function(){return Object.freeze({brand_awareness:"BRAND_AWARENESS",canvas_app_engagement:"CANVAS_APP_ENGAGEMENT",canvas_app_installs:"CANVAS_APP_INSTALLS",conversions:"CONVERSIONS",event_responses:"EVENT_RESPONSES",external:"EXTERNAL",lead_generation:"LEAD_GENERATION",link_clicks:"LINK_CLICKS",local_awareness:"LOCAL_AWARENESS",mobile_app_engagement:"MOBILE_APP_ENGAGEMENT",mobile_app_installs:"MOBILE_APP_INSTALLS",offer_claims:"OFFER_CLAIMS",page_likes:"PAGE_LIKES",post_engagement:"POST_ENGAGEMENT",product_catalog_sales:"PRODUCT_CATALOG_SALES",video_views:"VIDEO_VIEWS"})}},{key:"Operator",get:function(){return Object.freeze({all:"ALL",any:"ANY"})}}]),t}(AbstractCrudObject),ProductItem=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getProductSets",value:function(e,t,i){return this.getEdge(ProductSet,e,t,i)}}],[{key:"getEndpoint",value:function(){return"products"}},{key:"Fields",get:function(){return Object.freeze({additional_image_urls:"additional_image_urls",age_group:"age_group",applinks:"applinks",availability:"availability",brand:"brand",category:"category",color:"color",commerce_insights:"commerce_insights",condition:"condition",custom_data:"custom_data",custom_label_0:"custom_label_0",custom_label_1:"custom_label_1",custom_label_2:"custom_label_2",custom_label_3:"custom_label_3",custom_label_4:"custom_label_4",description:"description",expiration_date:"expiration_date",gender:"gender",gtin:"gtin",id:"id",image_url:"image_url",manufacturer_part_number:"manufacturer_part_number",material:"material",name:"name",ordering_index:"ordering_index",pattern:"pattern",price:"price",product_feed:"product_feed",product_type:"product_type",retailer_id:"retailer_id",retailer_product_group_id:"retailer_product_group_id",review_rejection_reasons:"review_rejection_reasons",review_status:"review_status",sale_price:"sale_price",sale_price_end_date:"sale_price_end_date",sale_price_start_date:"sale_price_start_date",shipping_weight_unit:"shipping_weight_unit",shipping_weight_value:"shipping_weight_value",size:"size",start_date:"start_date",url:"url",visibility:"visibility",android_app_name:"android_app_name",android_class:"android_class",android_package:"android_package",android_url:"android_url",checkout_url:"checkout_url",currency:"currency",inventory:"inventory",ios_app_name:"ios_app_name",ios_app_store_id:"ios_app_store_id",ios_url:"ios_url",ipad_app_name:"ipad_app_name",ipad_app_store_id:"ipad_app_store_id",ipad_url:"ipad_url",iphone_app_name:"iphone_app_name",iphone_app_store_id:"iphone_app_store_id",iphone_url:"iphone_url",windows_phone_app_id:"windows_phone_app_id",windows_phone_app_name:"windows_phone_app_name",windows_phone_url:"windows_phone_url"})}}]),t}(AbstractCrudObject),ProductSet=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments));
}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getProducts",value:function(e,t,i){return this.getEdge(ProductItem,e,t,i)}}],[{key:"getEndpoint",value:function(){return"product_sets"}},{key:"Fields",get:function(){return Object.freeze({filter:"filter",id:"id",name:"name",product_catalog:"product_catalog",product_count:"product_count"})}}]),t}(AbstractCrudObject),ProductCatalog=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getProductSets",value:function(e,t,i){return this.getEdge(ProductSet,e,t,i)}},{key:"getProducts",value:function(e,t,i){return this.getEdge(ProductItem,e,t,i)}}],[{key:"getEndpoint",value:function(){return"product_catalogs"}},{key:"Fields",get:function(){return Object.freeze({business:"business",feed_count:"feed_count",id:"id",name:"name",product_count:"product_count"})}}]),t}(AbstractCrudObject),Business=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getProductCatalogs",value:function(e,t,i){return this.getEdge(ProductCatalog,e,t,i)}}],[{key:"getEndpoint",value:function(){return"businesses"}},{key:"Fields",get:function(){return Object.freeze({id:"id",name:"name",payment_account_id:"payment_account_id",primary_page:"primary_page"})}}]),t}(AbstractCrudObject),User=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getAdAccounts",value:function(e,t,i){return this.getEdge(AdAccount,e,t,i)}},{key:"getBusinesses",value:function(e,t,i){return this.getEdge(Business,e,t,i)}}],[{key:"Fields",get:function(){return Object.freeze({about:"about",admin_notes:"admin_notes",age_range:"age_range",bio:"bio",birthday:"birthday",context:"context",cover:"cover",currency:"currency",devices:"devices",education:"education",email:"email",favorite_athletes:"favorite_athletes",favorite_teams:"favorite_teams",first_name:"first_name",gender:"gender",hometown:"hometown",id:"id",inspirational_people:"inspirational_people",install_type:"install_type",installed:"installed",interested_in:"interested_in",is_shared_login:"is_shared_login",is_verified:"is_verified",labels:"labels",languages:"languages",last_name:"last_name",link:"link",locale:"locale",location:"location",meeting_for:"meeting_for",middle_name:"middle_name",name:"name",name_format:"name_format",payment_pricepoints:"payment_pricepoints",political:"political",public_key:"public_key",quotes:"quotes",relationship_status:"relationship_status",religion:"religion",security_settings:"security_settings",shared_login_upgrade_required_by:"shared_login_upgrade_required_by",significant_other:"significant_other",sports:"sports",test_group:"test_group",third_party_id:"third_party_id",timezone:"timezone",token_for_business:"token_for_business",updated_time:"updated_time",verified:"verified",video_upload_limits:"video_upload_limits",viewer_can_send_gift:"viewer_can_send_gift",website:"website",work:"work"})}}]),t}(AbstractCrudObject),AdAccount=function(e){function t(){return babelHelpers.classCallCheck(this,t),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"getAdCreatives",value:function(e,t,i){return this.getEdge(AdCreative,e,t,i)}},{key:"getAds",value:function(e,t,i){return this.getEdge(Ad,e,t,i)}},{key:"getAdSets",value:function(e,t,i){return this.getEdge(AdSet,e,t,i)}},{key:"getCampaigns",value:function(e,t,i){return this.getEdge(Campaign,e,t,i)}},{key:"getGeneratePreviews",value:function(e,t,i){return this.getEdge(AdPreview,e,t,i,"generatepreviews")}},{key:"getInsights",value:function(e,t,i){return this.getEdge(Insights,e,t,i)}},{key:"getUsers",value:function(e,t,i){return this.getEdge(User,e,t,i)}}],[{key:"getEndpoint",value:function(){return"adaccounts"}},{key:"Fields",get:function(){return Object.freeze({account_groups:"account_groups",account_id:"account_id",account_status:"account_status",age:"age",agency_client_declaration:"agency_client_declaration",amount_spent:"amount_spent",balance:"balance",business:"business",business_city:"business_city",business_country_code:"business_country_code",business_name:"business_name",business_state:"business_state",business_street:"business_street",business_street2:"business_street2",business_zip:"business_zip",can_create_brand_lift_study:"can_create_brand_lift_study",capabilities:"capabilities",created_time:"created_time",currency:"currency",disable_reason:"disable_reason",end_advertiser:"end_advertiser",end_advertiser_name:"end_advertiser_name",failed_delivery_checks:"failed_delivery_checks",funding_source:"funding_source",funding_source_details:"funding_source_details",has_migrated_permissions:"has_migrated_permissions",id:"id",io_number:"io_number",is_notifications_enabled:"is_notifications_enabled",is_personal:"is_personal",is_prepay_account:"is_prepay_account",is_tax_id_required:"is_tax_id_required",last_used_time:"last_used_time",line_numbers:"line_numbers",media_agency:"media_agency",min_campaign_group_spend_cap:"min_campaign_group_spend_cap",min_daily_budget:"min_daily_budget",name:"name",offsite_pixels_tos_accepted:"offsite_pixels_tos_accepted",owner:"owner",owner_business:"owner_business",partner:"partner",rf_spec:"rf_spec",spend_cap:"spend_cap",tax_id:"tax_id",tax_id_status:"tax_id_status",tax_id_type:"tax_id_type",timezone_id:"timezone_id",timezone_name:"timezone_name",timezone_offset_hours_utc:"timezone_offset_hours_utc",tos_accepted:"tos_accepted",user_role:"user_role"})}},{key:"AccessType",get:function(){return Object.freeze({owner:"OWNER",agency:"AGENCY"})}},{key:"PermittedRoles",get:function(){return Object.freeze({admin:"ADMIN",general_user:"GENERAL_USER",reports_only:"REPORTS_ONLY",instagram_advertiser:"INSTAGRAM_ADVERTISER",instagram_manager:"INSTAGRAM_MANAGER",fb_employee_dso_advertiser:"FB_EMPLOYEE_DSO_ADVERTISER"})}}]),t}(AbstractCrudObject);exports.FacebookAdsApi=FacebookAdsApi,exports.AdAccount=AdAccount,exports.AdCreative=AdCreative,exports.AdPreview=AdPreview,exports.AdSet=AdSet,exports.Ad=Ad,exports.Business=Business,exports.Campaign=Campaign,exports.Insights=Insights,exports.ProductCatalog=ProductCatalog,exports.ProductItem=ProductItem,exports.ProductSet=ProductSet,exports.User=User;
//# sourceMappingURL=cjs.js.map
