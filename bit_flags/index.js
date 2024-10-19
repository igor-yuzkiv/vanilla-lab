/**
 * Reference: https://www.hendrik-erz.de/post/bitwise-flags-are-beautiful-and-heres-why
 */

const SOUND_ENABLED = 1
const VIDEO_ENABLED = 2
const AUTOPLAY_ENABLED = 4
const ADS_ENABLED = 8

let settings = 0

function enableFlag(flag) {
    settings |= flag
}

function disableFlag(flag) {
    settings &= ~flag
}

function isEnableFlag(flag) {
    return Boolean(settings & flag)
}

enableFlag(SOUND_ENABLED | VIDEO_ENABLED)
enableFlag(AUTOPLAY_ENABLED)
enableFlag(ADS_ENABLED)

disableFlag(AUTOPLAY_ENABLED | ADS_ENABLED)

console.log('Sound:', isEnableFlag(SOUND_ENABLED))
console.log('Video:', isEnableFlag(VIDEO_ENABLED))
console.log('Autoplay:', isEnableFlag(AUTOPLAY_ENABLED))
console.log('Ads:', isEnableFlag(ADS_ENABLED))
console.log('Sound & Video:', isEnableFlag(SOUND_ENABLED | VIDEO_ENABLED))

// Output:
// Sound: true
// Video: true
// Autoplay: false
// Ads: false
// Sound & Video: true
