import { RowBetween } from 'components/Row'
import useTheme from 'hooks/useTheme'
import React, { useEffect } from 'react'
import { useIsDarkMode } from 'state/user/hooks'
import { ExternalLink, TYPE } from 'theme'

import lamboproblem from '../../assets/images/susu/lamboproblem.jpg'
import punishedlambo from '../../assets/images/punished_lambo.jpg'

type RoleProps = {
  plural?: boolean
  dark: boolean
}

const Valet = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#56cc55' : '#1c881b' }}>{plural ? 'Valets' : 'Valet'}</span>
)
const WoodSourcer = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#c18355' : '#a46736' }}>{plural ? 'Wood Sourcers' : 'WoodSourcer'}</span>
)

const VIP = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#fff56a' : '#c7a723' }}>{plural ? 'VIPs' : 'VIP'}</span>
)

const PotatoPeeler = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#c4ab74' : '#7e6f53' }}>{plural ? 'Potato Peelers' : 'Potato Peeler'}</span>
)

const Firestarter = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#ff4f41' : '#d23813' }}>{plural ? 'Firestarters' : 'Firestarter'}</span>
)

const Grillmaster = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#b83a57' : '#831f36' }}>{plural ? 'Grillmasters' : 'Grillmaster'}</span>
)

const Stowaway = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#87d4b8' : '#369d7f' }}>{plural ? 'Stowaways' : 'Stowaway'}</span>
)

const Entertainer = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#4fc7db' : '#36549d' }}>{plural ? 'Whale Entertainers' : 'Whale Entertainer'}</span>
)

const DJ = ({ dark, plural }: RoleProps) => (
  <span style={{ color: dark ? '#ca76ea' : '#9f179b' }}>{plural ? 'DJs' : 'DJ'}</span>
)

export const StoryX = ({ page, onFinalPage }: { page: number; onFinalPage: VoidFunction }) => {
  const theme = useTheme()
  const dark = useIsDarkMode()
  const page0 = (
    <>
      <RowBetween>
        <TYPE.white color={theme.text1}>Governance is here!</TYPE.white>
      </RowBetween>
      <ExternalLink href={`https://snapshot.org/#/carbonswap.eth`} target="_blank">
        Find us on Snapshot<span style={{ fontSize: '14px' }}>↗</span>
      </ExternalLink>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Attention to all citizens of the CarbonSwap Metaverse!
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The Soots want to express their most heartfelt gratitude for the incredible participation seen in the
          governance voting of the first “core” proposal.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          As mentioned earlier, the team was aiming to use this occasion as an experiment of sorts, to learn from the
          experience and pave the way for the great governance events that will shape CarbonSwap’s future. Your choices
          have determined the continuation of the Season 1 storyline, and therefore yet another piece of CS Metaverse’s
          “canon”.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          That was it, really! No crazy hidden ramifications this time! Worry not, for even if we enjoy speaking in
          riddles at times, we will now be as clear as it gets: any proposal carrying even the slightest amount of
          impact will be always thoroughly presented and dissected, and we’ll make sure the community has all the
          necessary context to make an informed decision.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          With that said, let's find out your solution to the Lambo problem! Onwards and upwards!
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Alternatively, if you want some more context, you'll find the rest of the story by clicking backwards.
        </TYPE.white>
      </RowBetween>
    </>
  )
  const page1 = (
    <>
      <RowBetween>
        <TYPE.white color={theme.text1}>Roll With the Punches</TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          We are turning back the clocks a few weeks, to a time of great intrigue and optimism, when SUSUs had only just
          blessed us with their appearance.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          As some may recall, there was a SUSU summoning party, though those present had great trouble making it back
          home.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Following their trials and tribulations they awoke to an invitation from a certain Frog, beckoning them to a
          lavish BBQ. Of course, the steak was grilled and we now bask in the Age of Stake.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Yet, the story is far from over, with missing details now starting to arise. We resume the tale of the
          aforementioned Frog, having just concluded her successful BBQ party.
        </TYPE.white>
      </RowBetween>
    </>
  )

  const page2 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          It was that glorious midsummer’s dawn, four or so hours after midnight, the sun not yet fully realized but the
          atmosphere palpable, both thrilling and comforting.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The majority of party-goers had reluctantly given up the night, though some remained basking in the air’s
          optimism. <Valet plural dark={dark} />, <WoodSourcer plural dark={dark} />, <Grillmaster plural dark={dark} />
          , <VIP plural dark={dark} />, <DJ plural dark={dark} />, <PotatoPeeler plural dark={dark} />,{' '}
          <Firestarter plural dark={dark} />, <Stowaway plural dark={dark} />, and <Entertainer plural dark={dark} />{' '}
          alike, still coming to terms with their new roles (and bodies, in some cases), poured through the front gates.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The <Firestarter plural dark={dark} /> scattered first. Their one true calling in life was emphatically
          setting things on fire. Most of the time they channeled it productively. On occassion they&#39;d accidentally
          scorch a few too many spuds, yet, to the dismay of the <PotatoPeeler plural dark={dark} />, they always
          escaped unpunished given how loveable and bushy their mustaches were.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Not a lot of joy was to be found for them here, on the early morning of birdsong set against magnificently
          luscious woodland flora. They&#39;d been explicitly warned by the <WoodSourcer plural dark={dark} /> against
          lighting up the forest, so the <Firestarter plural dark={dark} /> had no reason to stick around, turning their
          attention towards the harsh and unforgiving mountains they called home.
        </TYPE.white>
      </RowBetween>
    </>
  )

  const page3 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The <Stowaway plural dark={dark} />, meanwhile, couldn’t be happier about their intrusion. Sure, they didn’t
          get an invite. Sure, they were missing a few SUSUs. They had every right to be salty. But none of that
          mattered now, for they still felt intoxicated by the beauty, wealth and unbridled festivity of the event. In
          their mind, they were every bit a <VIP dark={dark} />.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          However, forgetting how they had arrived, they were now stranded in the middle of dense forest. Yet one
          particularly sharp <Stowaway dark={dark} /> had a plan. “People got here in cars” he thought, “they will have
          to leave in them”. Brilliant deduction.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Nobody noticed our gallant <Stowaway dark={dark} /> as he popped the trunk of the nearest vehicle. Drawn to
          bright colors, the <Stowaway dark={dark} /> picked the mesmerizing green Lambo over a more modest and
          potentially comforting ride.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Shortly after, the rightful owner of the Lambo showed up, a stylish Frog who, by the looks of it, hadn’t
          stopped partying all night. The Frog got her keys from one of the eager <Valet plural dark={dark} />, hopped
          in the front seat and raced off-road into the forest.
        </TYPE.white>
      </RowBetween>
    </>
  )

  const page4 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The autonomous Lambo soon found a road and seemed more or less happy, a state of contentment rare for a being
          that had consciousness thrust upon it without consent.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The serenity of dawn was suddenly lost. As the lambo sped down the road, still surrounded by thick woods,
          tension manifested into a particularly grave situation ahead.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Before the Frog lay a pedestrian crossing. She could make out several figures presently on the road. Several
          more came into view on approach, their red faces and bushy black moustaches betraying their intent. For they
          were <Firestarter plural dark={dark} />, rushing to get back to their mountain lair.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The <Firestarter plural dark={dark} /> noticed the Lambo approaching at an alarming speed. Their faces were
          drawn, terrified at the prospect of collision.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The Frog gasped, shook from seeing what beckoned in front of her. Her options were limited, going at such
          speed and with minimal space for maneuvering. In this hopeless moment she spared a thought for the{' '}
          <Grillmaster plural dark={dark} /> who&#39;d be lost without their firey brethren.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          She had to make a decision and she had to make it fast. Though the Lambo was autonomous, she could override
          the controls to take lives into her own hands.
        </TYPE.white>
      </RowBetween>
    </>
  )

  const page5 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Should she stay on course, hoping the <Firestarter plural dark={dark} /> will be fast enough to dodge the
          Lambo? Resourceful as they are, the Frog knew deep down that was wishful thinking. Sacrifices would indeed be
          incurred.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          To avoid putting the lives of the <Firestarter plural dark={dark} /> at risk, whom she was quite fond of
          (having previously saved them from wrath of the <PotatoPeeler plural dark={dark} />
          ), the only solution was swinging a hard right, abandoning the road and venturing back into the wilderness.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Maybe the vegetation will help slow the car down? Except foliage is not exactly known for its capacity to
          reliably stop a car that is traversing at obscene speeds.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          And what is the chance of hitting foliage over a more likely tree? All these thoughts were running through the
          Frog’s mind at this moment of decision.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The Frog had to decide what her next step would be. The situation was uncertain at best, and risky no matter
          what. Lives were at risk in both situations.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Inside the Lambo’s trunk, unaware of the situation he was in, the <Stowaway dark={dark} /> quietly said to
          himself, “this is going great!"
        </TYPE.white>
      </RowBetween>
      <img src={lamboproblem}></img>
      <RowBetween>
        <ExternalLink
          href={`https://snapshot.org/#/carbonswap.eth/proposal/QmVrxey5iTbcFzZgDNwqC68ydKdMHgK1ndGwwpKcerPSU5`}
          target="_blank"
        >
          See the proposal and the community's decision on Snapshot<span style={{ fontSize: '14px' }}>↗</span>
        </ExternalLink>
      </RowBetween>
    </>
  )
  const page6 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The band of <Firestarter plural dark={dark} /> cowered before the might of the oncoming Lambo’s headlights.
          Their feet were planted, fully expecting the collision. They had no chance to look towards one another, nor to
          their loved ones standing in horror at the relative safety of the forest’s border with the road.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Bracing for impact, the fiery goblins closed their eyes and twirled their moustaches one last time. Their
          friends and family turned away, unable to bear witness to this tragedy.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Yet the impact never arrived.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The shaken <Firestarter plural dark={dark} /> were reunited. They continued towards Mount Boom, their home
          amongst the range.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Later, <PotatoPeeler plural dark={dark} />, from their birdseye view atop the soaring pile of royal potatoes,
          would tell of the pyrotechnics on display, shooting out beyond the canopy of the expansive forest.
        </TYPE.white>
      </RowBetween>
    </>
  )
  const page7 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          So low were the Lambo’s operative decibels that it could slip into the wilderness without attracting
          attention.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The Frog had at the last decided to swing that hard right, away from the terror that would no doubt have
          ensued.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The Lambo groaned, revealing its opinion on the matter, for it had been subjected to the worse of the two
          options. This option would surely lead to its demise. The Queen Frog gasped, hearing the Lambo for the first
          time.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Hurtling through the flora and narrowly avoiding the thick trunks of the ancient trees, the Frog steered the
          Lambo expertly. Yet the forest had other plans. The Frog became aware of the trees closing in on them,
          narrowing her options to maneuver.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The forest had left no alternative. The Lambo crashed into a great Oak, uprooting it slightly. The tree stood
          firm, however, even against the mass and velocity of the vehicle.
        </TYPE.white>
      </RowBetween>
    </>
  )
  const page8 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Out of the back popped the Stowaway, patting himself frantically. Flames engulfed the rear-side of the Lambo,
          thick smoke arising from it.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The Stowaway, panicking, thought about leaving. This wasn’t quite what he bargained for. Yet he took a look
          through the driver’s window and was shocked to see the Queen Frog laying unconscious, spread across the
          dashboard. He couldn’t leave her.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          He dragged the Frog out of the wreckage. The thickness of the smoke now taking its toll on him, he passed in
          and out of consciousness. Before losing it completely, he witnessed a group of{' '}
          <WoodSourcer plural dark={dark} /> approaching.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The <WoodSourcer plural dark={dark} /> arrived just in time, carrying them to safety. The Frog was most
          grateful to the Stowaway and the Wood Sourcers for their timely support. She decided to turn a blind eye to
          the Stowaway’s intrusion and promised them all a reward for their bravery.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          And that was that. They all went their separate ways, each thankful that their lives (as well as those of the
          Firestarters) had been spared. Surely, they believed, this was the more favorable timeline.
        </TYPE.white>
      </RowBetween>
    </>
  )
  const page9 = (
    <>
      <img src={punishedlambo} />
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Rest in Peace, Poor Lambo.
        </TYPE.white>
      </RowBetween>
    </>
  )
  const page10 = (
    <>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          The air cooled around the crash site. Ash settled. The space between the trees once again widened. All that
          was left was the Lambo, stricken and defeated.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          It was still dawn, with little light to be had on the forest floor. Out of the darkness a crimson glow
          appeared around the Lambo.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          “AARGH” the Punished Lambo let out. It reversed, drawing rings of light on the dented tree trunk before it.
          Synthetic revs reverberated between the ancient Oaks, unsettling nesting birds.
        </TYPE.white>
      </RowBetween>
      <RowBetween>
        <TYPE.white fontSize={14} color={theme.text2}>
          Two great red eyes it bore upon its face. Demented, harboring venom from being cast aside and left to die, the
          Punished Lambo raced off.
        </TYPE.white>
      </RowBetween>
    </>
  )

  const story = [page0, page1, page2, page3, page4, page5, page6, page7, page8, page9, page10]

  useEffect(() => {
    if (page === story.length - 1) {
      onFinalPage()
    }
  }, [page, onFinalPage, story.length])

  return story[page]
}
