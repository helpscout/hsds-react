import happy from '../../emoticons/happy.svg'
import meh from '../../emoticons/meh.svg'
import sad from '../../emoticons/sad.svg'
import reactionHappyOnLarge from '../../emoticons/reaction-happy-on-large.svg'
import reactionHappyOnMedium from '../../emoticons/reaction-happy-on-medium.svg'
import reactionHappyOnSmall from '../../emoticons/reaction-happy-on-small.svg'
import reactionHappyOffLarge from '../../emoticons/reaction-happy-off-large.svg'
import reactionHappyOffMedium from '../../emoticons/reaction-happy-off-medium.svg'
import reactionHappyOffSmall from '../../emoticons/reaction-happy-off-small.svg'
import reactionOkayOnLarge from '../../emoticons/reaction-okay-on-large.svg'
import reactionOkayOnMedium from '../../emoticons/reaction-okay-on-medium.svg'
import reactionOkayOnSmall from '../../emoticons/reaction-okay-on-small.svg'
import reactionOkayOffLarge from '../../emoticons/reaction-okay-off-large.svg'
import reactionOkayOffMedium from '../../emoticons/reaction-okay-off-medium.svg'
import reactionOkayOffSmall from '../../emoticons/reaction-okay-off-small.svg'
import reactionSadOnLarge from '../../emoticons/reaction-sad-on-large.svg'
import reactionSadOnMedium from '../../emoticons/reaction-sad-on-medium.svg'
import reactionSadOnSmall from '../../emoticons/reaction-sad-on-small.svg'
import reactionSadOffLarge from '../../emoticons/reaction-sad-off-large.svg'
import reactionSadOffMedium from '../../emoticons/reaction-sad-off-medium.svg'
import reactionSadOffSmall from '../../emoticons/reaction-sad-off-small.svg'

const ICONS = {
  /**
   * Legacy
   */
  'happy-large': happy,
  'meh-large': meh,
  'sad-large': sad,
  happy: happy,
  meh: meh,
  sad: sad,

  /**
   * New reactions emoticons
   *
   * Format: [emoticon-name (kebabcase)]-[active status: on, off]-[size: lg, md, sm]
   */
  'reaction-happy-on-lg': reactionHappyOnLarge,
  'reaction-happy-on-md': reactionHappyOnMedium,
  'reaction-happy-on-sm': reactionHappyOnSmall,
  'reaction-happy-off-lg': reactionHappyOffLarge,
  'reaction-happy-off-md': reactionHappyOffMedium,
  'reaction-happy-off-sm': reactionHappyOffSmall,
  'reaction-okay-on-lg': reactionOkayOnLarge,
  'reaction-okay-on-md': reactionOkayOnMedium,
  'reaction-okay-on-sm': reactionOkayOnSmall,
  'reaction-okay-off-lg': reactionOkayOffLarge,
  'reaction-okay-off-md': reactionOkayOffMedium,
  'reaction-okay-off-sm': reactionOkayOffSmall,
  'reaction-sad-on-lg': reactionSadOnLarge,
  'reaction-sad-on-md': reactionSadOnMedium,
  'reaction-sad-on-sm': reactionSadOnSmall,
  'reaction-sad-off-lg': reactionSadOffLarge,
  'reaction-sad-off-md': reactionSadOffMedium,
  'reaction-sad-off-sm': reactionSadOffSmall,
}

export default ICONS
