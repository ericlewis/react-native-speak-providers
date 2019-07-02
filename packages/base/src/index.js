"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __importDefault(require("invariant"));
var react_native_1 = require("react-native");
var react_native_speak_1 = require("react-native-speak");
var Provider = /** @class */ (function () {
    function Provider(accessToken) {
        this.native = react_native_speak_1.RNSpeak;
        this.accessToken = accessToken;
    }
    Object.defineProperty(Provider.prototype, "bufferSize", {
        get: function () {
            return 16000;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Plays a base64 encoded string on the native platform
     * @param content base64 encoded string
     * @param options
     */
    Provider.prototype.playAudioContent = function (content, utterance, options) {
        return this.native.playAudioContent(content, utterance, options);
    };
    /**
     * Convenience method for getting the class name
     * we use this as a UUID essentially
     */
    Provider.prototype.getClassName = function () {
        return this.constructor.name;
    };
    /**
     * Check if this provider is the same as the one passed
     * @param provider
     */
    Provider.prototype.isEqualToProvider = function (provider) {
        return this.getClassName() === provider.getClassName();
    };
    /**
     * Check if the options are compatible with the provider
     * Mostly a precheck to ensure that we have no problems with voiceId
     */
    Provider.prototype.optionsCompatible = function (options) {
        var voiceId = options.voiceId, speakingRate = options.speakingRate, codec = options.codec;
        if (voiceId) {
            invariant_1.default(this.isValidVoiceId(voiceId), 'VoiceId belongs to a different provider');
        }
        if (speakingRate) {
            invariant_1.default(speakingRate <= 2.0 || speakingRate >= 0.1, 'Speaking rate must be between 0.1 & 2.0');
        }
        if (!codec) {
            options.codec = react_native_1.Platform.OS === 'android' ? 'pcm' : 'mp3';
        }
        return options;
    };
    /**
     * VoiceId prefix, used to ensure we aren't accidentally setting voiceId's that can't work with a provider
     */
    Provider.prototype.getVoiceIdSlug = function () {
        return this.getClassName() + ":";
    };
    /**
     * Adds slug to voiceId, ignores if the slug has already been added
     */
    Provider.prototype.sluggifyVoiceId = function (voiceId) {
        var slug = this.getClassName();
        return voiceId.startsWith(slug) ? voiceId : slug + ":" + voiceId;
    };
    /**
     * Verify the voiceId
     * @param voiceId
     */
    Provider.prototype.isValidVoiceId = function (voiceId) {
        return voiceId.startsWith(this.getVoiceIdSlug());
    };
    /**
     * String the voiceId slug, also enforces correctness
     * @param voiceId
     */
    Provider.prototype.stripVoiceIdSlug = function (voiceId) {
        invariant_1.default(this.isValidVoiceId(voiceId), "Slug doesn't belong to provider");
        return voiceId.replace(this.getVoiceIdSlug(), '');
    };
    /**
     * Convenience method for request URL
     * @param endpoint
     */
    Provider.prototype.getBaseURL = function (endpoint) {
        return "" + this.constructor.baseURL + endpoint;
    };
    /**
     * Generate's an SSML wrapped utterance string based on the options provided
     * SSML is fairly standardized (w3c) so we shouldn't have too much trouble
     * with basic wrapping for adjustments.
     * @param utterance
     * @param options
     */
    Provider.prototype.getSSML = function (utterance, options) {
        // the rate is a float between 0.0 and 1.0
        // we truncate the value after multiply bc
        // we do not want the float in a percentage
        var speakingRate = options.speakingRate
            ? (options.speakingRate * 100).toFixed(0)
            : 100;
        var pitch = options.pitch ? (options.pitch * 100).toFixed(0) : 0;
        return "<speak><prosody rate=\"" + speakingRate + "%\" pitch=\"" + pitch + "%\">" + utterance + "</prosody></speak>";
    };
    return Provider;
}());
exports.Provider = Provider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFrQztBQUNsQyw2Q0FBd0M7QUFDeEMseURBQTZDO0FBYzdDO0lBS0Usa0JBQVksV0FBMEI7UUFGNUIsV0FBTSxHQUFHLDRCQUFPLENBQUM7UUFHekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLGdDQUFVO2FBQXJCO1lBQ0UsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDOzs7T0FBQTtJQVdEOzs7O09BSUc7SUFDSSxtQ0FBZ0IsR0FBdkIsVUFDRSxPQUFlLEVBQ2YsU0FBaUIsRUFDakIsT0FBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLCtCQUFZLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksb0NBQWlCLEdBQXhCLFVBQXlCLFFBQWtCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksb0NBQWlCLEdBQXhCLFVBQXlCLE9BQXNCO1FBQ3JDLElBQUEseUJBQU8sRUFBRSxtQ0FBWSxFQUFFLHFCQUFLLENBQWE7UUFDakQsSUFBSSxPQUFPLEVBQUU7WUFDWCxtQkFBUyxDQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQzVCLHlDQUF5QyxDQUMxQyxDQUFDO1NBQ0g7UUFFRCxJQUFJLFlBQVksRUFBRTtZQUNoQixtQkFBUyxDQUNQLFlBQVksSUFBSSxHQUFHLElBQUksWUFBWSxJQUFJLEdBQUcsRUFDMUMseUNBQXlDLENBQzFDLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxHQUFHLHVCQUFRLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDM0Q7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDTyxpQ0FBYyxHQUF4QjtRQUNFLE9BQVUsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFHLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ08sa0NBQWUsR0FBekIsVUFBMEIsT0FBZTtRQUN2QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFJLElBQUksU0FBSSxPQUFTLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGlDQUFjLEdBQXhCLFVBQXlCLE9BQWU7UUFDdEMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDTyxtQ0FBZ0IsR0FBMUIsVUFBMkIsT0FBZTtRQUN4QyxtQkFBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztRQUMzRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7SUFDTyw2QkFBVSxHQUFwQixVQUFxQixRQUFnQjtRQUNuQyxPQUFPLEtBQUksSUFBSSxDQUFDLFdBQStCLENBQUMsT0FBTyxHQUFHLFFBQVUsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sMEJBQU8sR0FBakIsVUFBa0IsU0FBaUIsRUFBRSxPQUFzQjtRQUN6RCwwQ0FBMEM7UUFDMUMsMENBQTBDO1FBQzFDLDJDQUEyQztRQUMzQyxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWTtZQUN2QyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUVSLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRSxPQUFPLDRCQUF5QixZQUFZLG9CQUFhLEtBQUssWUFBTSxTQUFTLHVCQUFvQixDQUFDO0lBQ3BHLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQXpJRCxJQXlJQztBQXpJcUIsNEJBQVEifQ==