// /w/xt_data.js — ข้อมูลพรสวรรค์ลิขิต 200 แบบ + ร่างวิวัฒน์/ร่างซ่อน + คอมโบ + ปณิธานชะตา (ใช้โดย w/xt.js)
// รูปแบบ: id|โลก|ความหายาก|ประเภท|ชื่อไทย|ชื่ออังกฤษ|คำโปรยไทย|คำโปรยอังกฤษ|ผล|เสริม
//  โลก: a=ทุกโลก m=ยุทธภพ x=เซียน w=ยุคปัจจุบัน s=จิตวิญญาณยุทธ์ k=ทะลุฟ้าดารา f=ม่านหมอก b=สัตว์ r=ผู้ย้อนกาล
//  ความหายาก: 1 ธรรมดา 2 หายาก 3 ตำนาน 9 ต้องสาป · ประเภท: 2 สองคม 3 วิวัฒน์ 4 ซ่อน 5 เปลี่ยนกติกา 6 ผูกกับคนอื่น 7 ชิ้นส่วนคอมโบ
//  ผล: pw พลัง%/ปี · mon เงิน/ปี · int cha kar fame ต่อปี · life อายุขัย(ครั้งเดียว) · hp พลังชีวิตสูงสุด(ครั้งเดียว) · pwx พลัง%(ครั้งเดียว)
//      duel ตัวคูณศัตรู · mgz มินิเกมช้าลง · mgs คะแนนมินิเกม+ · heal รอดตอนใกล้ตาย(ฟื้นเป็น %) · dmg เสียเลือด%/ปี · seer เห็นโอกาสชนะก่อนดวล
//      @เงื่อนไข: odd even lt30 gt30 gt50 kp kn mar sgl rich poor night day wkend kid nokid p30 p10
window.XT_RAW=`
a01|a|1|2|มือหนักใจเบา|Heavy Hands, Light Heart|ตีแรงแต่ลืมง่าย|Hits hard, forgets fast|pw=1.2,int=-2
a02|a|1|2|นอนน้อยแต่ไม่ง่วง|Never Sleepy|ทำงานได้ทั้งวันทั้งคืน แต่ร่างกายทรุดทีละน้อย|Works day and night, body wears slowly|mon=400,dmg=2
a03|a|2|2|โชคดีปีคี่|Odd-Year Luck|ปีคี่ฟ้าเข้าข้าง ปีคู่ฟ้าเมิน|Heaven favors odd years, ignores even ones|pw=2.5@odd,pw=-1@even
a04|a|1|2|ใจดีจนจน|Kind to a Fault|ช่วยทุกคน เงินไม่เคยเหลือ|Helps everyone, never has money left|kar=6,mon=-150
a05|a|2|2|ดวงตาเหยี่ยว|Hawk Eyes|มองเห็นทุกอย่าง รวมถึงสิ่งที่ไม่อยากเห็น|Sees everything, even what you'd rather not|mgs=.08,int=2,dmg=1@p30
a06|a|1|2|ปากหวานใจร้าย|Sweet Tongue, Cold Heart|คนรักแต่กรรมไม่รัก|People adore you; karma doesn't|cha=3,kar=-3
a07|a|2|2|ร่างทองแดงสมองเต้าหู้|Bronze Body, Tofu Brain|ทนทุกอย่างยกเว้นการคิด|Tough as bronze, soft upstairs|hp=60,int=-3
a08|a|3|2|อัจฉริยะช่วงสั้น|Brief Genius|เก่งที่สุดก่อนสามสิบ แล้วกลายเป็นคนธรรมดา|A prodigy until thirty, then ordinary|pw=4@lt30,pw=-1@gt30
a09|a|1|2|ขี้เกียจแต่โชคดี|Lazy but Lucky|ไม่ทำอะไรก็ได้ดี|Does nothing, still does fine|mon=300,pw=-.5
a10|a|2|2|เลือดร้อน|Hot Blood|สู้เก่งเมื่อโกรธ แต่โกรธบ่อยไป|Fights best angry — and is angry too often|duel=.9,kar=-2,dmg=1
a11|a|9|2|อายุสั้นพลังยาว|Short Life, Long Power|ทุกปีเท่ากับสองปีของคนอื่น แต่ชีวิตสั้นลง|Each year counts double, but life is short|pw=3.5,life=-20
a12|a|2|2|ชะตาสองหน้า|Two-Faced Fate|เงินมาก็หาย เงินหายก็มา|Money comes and goes in waves|mon=1200@p30,mon=-500@p30
a13|a|1|2|เท้าไว|Quick Feet|หนีเก่งเกินไปจนไม่ค่อยได้สู้|Too good at running to ever fight|mgz=1.1,fame=-3
a14|a|9|2|หนี้กรรมติดตัว|Born in Debt|ทุกอย่างได้มาสองเท่า แต่ทุกปีต้องชดใช้|Gain double, but pay every year|pw=2.5,mon=600,kar=-8,dmg=2
a15|a|2|2|รักแรกพบทุกครั้ง|Love at Every Sight|มีเสน่ห์เหลือเชื่อ แต่ใจไม่เคยอยู่กับที่|Irresistible, never settles|cha=6,kar=-2@mar
a16|a|1|2|เสียงดังฟังชัด|Loud and Clear|ทุกคนได้ยินคุณ รวมถึงศัตรู|Everyone hears you — enemies too|fame=8,duel=1.05
a17|a|2|2|ดวงชะตาเสี่ยง|Gambler's Star|ทุกอย่างคูณสอง ทั้งดีและร้าย|Everything doubles, good and bad|pw=3@p30,dmg=4@p30
a18|a|3|2|ยอดฝีมือไร้ชื่อ|Nameless Master|เก่งที่สุดในโลก แต่ไม่มีใครจำชื่อได้|Strongest alive, remembered by none|pw=3,fame=-15
a19|a|1|2|ร่าเริงตลอดกาล|Endlessly Cheerful|ไม่เคยเศร้า และไม่เคยเรียนรู้จากความผิดพลาด|Never sad, never learns|life=4,int=-1
a20|a|2|2|มือขวาทอง มือซ้ายดิน|Golden Right, Clay Left|เก่งอย่างเดียวสุดทาง|Brilliant at one thing only|mgs=.12,mgz=.9
a21|a|1|3|เมล็ดไร้ชื่อ|Nameless Seed|จะงอกเป็นอะไร ขึ้นกับว่าคุณใช้ชีวิตแบบไหน|What it grows into depends on how you live|pw=.4|ev:a21k,a21m,a21p
a22|a|2|3|ไข่ในอก|Egg in the Chest|มีบางอย่างฟักอยู่ในใจ|Something is hatching inside you|int=1|ev:a22k,a22m,a22p
a23|a|1|3|รอยแผลที่จำได้|Scar That Remembers|แผลเป็นที่เปลี่ยนรูปตามบาดแผลใหม่|A scar reshaped by every new wound|hp=10|ev:a23k,a23m,a23p
a24|a|2|3|ดาวที่ยังไม่ส่อง|Unlit Star|ดาวประจำตัวที่ยังไม่ตัดสินใจว่าจะส่องสีอะไร|A birth star that hasn't chosen its color|fame=1|ev:a24k,a24m,a24p
a25|a|3|3|ก้อนดินในมือฟ้า|Clay in Heaven's Hand|ฟ้ายังปั้นคุณไม่เสร็จ|Heaven hasn't finished shaping you|pw=.6|ev:a25k,a25m,a25p
a26|a|1|3|นิสัยที่ยังไม่โต|Unformed Habit|นิสัยติดตัวที่จะชัดเจนเมื่อโต|A habit that sharpens with age|cha=1|ev:a26k,a26m,a26p
a27|a|2|3|เสียงในความฝัน|Voice in Dreams|เสียงที่สอนคุณทุกคืน แต่ยังไม่บอกว่าเป็นใคร|Teaches you nightly, nameless still|int=2|ev:a27k,a27m,a27p
a28|a|1|3|รากที่หยั่งลึก|Deep Root|จะออกผลเมื่อถึงวัยกลางคน|Bears fruit in middle age|life=2|ev:a28k,a28m,a28p
a29|a|1|4|???|???|มีบางอย่างซ่อนอยู่ในชะตา|Something hides in your fate||hd:a40>a29h
a30|a|2|4|???|???|ชะตาที่ยังไม่ยอมเผย|A fate not yet revealed||hd:low>a30h
a31|a|2|4|???|???|รอใครบางคนอยู่|Waiting for someone||hd:mar>a31h
a32|a|1|4|???|???|เปิดเมื่อฟ้าอยากเปิด|Opens when heaven pleases||hd:p8>a32h
a33|a|3|4|???|???|บางอย่างที่ฟ้าซ่อนไว้ไม่ให้แม้แต่คุณรู้|Hidden even from you||hd:a60>a33h
a34|a|1|4|???|???|ติดตัวตั้งแต่ก่อนเกิด|Carried since before birth||hd:kid>a34h
a35|a|2|4|???|???|รอยประทับที่จางจนมองไม่เห็น|A mark too faint to see||hd:rich>a35h
a36|a|9|4|???|???|มีบางอย่างผิดปกติ…|Something is wrong…||hd:a25>a36h
a37|a|2|5|เห็นผลก่อนสู้|Sees the Outcome|รู้โอกาสชนะก่อนลงดวลทุกครั้ง|Knows the odds before every duel|seer=1
a38|a|1|5|โลกช้าลงหนึ่งจังหวะ|World a Beat Slower|มินิเกมทุกเกมช้าลงสำหรับคุณ|Every minigame slows for you|mgz=1.2
a39|a|2|5|ตายยากเหลือเชื่อ|Absurdly Hard to Kill|ใกล้ตายเมื่อไหร่ ร่างจะฟื้นขึ้นมาเอง|At death's door your body revives itself|heal=50
a40|a|1|5|สมาธิเหล็ก|Iron Focus|มินิเกมได้คะแนนเพิ่ม|Extra minigame score|mgs=.08
a41|a|3|5|เวลาโปรดปราน|Time's Favorite|มินิเกมช้าลงมาก และคะแนนดีขึ้น|Minigames slow greatly; scores rise|mgz=1.35,mgs=.06
a42|a|2|5|ศัตรูกลัวตั้งแต่ยังไม่สู้|Feared Before the Fight|คู่ต่อสู้ทุกคนอ่อนลงเมื่อเจอคุณ|Every foe weakens facing you|duel=.88
a43|a|1|5|ลางสังหรณ์|Gut Feeling|เห็นโอกาสชนะก่อนดวล และหลบเลือดได้บ้าง|Sees the odds; dodges a little|seer=1,dmg=-1
a44|a|2|5|สองชีวิต|Second Life|รอดจากความตายได้ครั้งหนึ่งทุกแปดปี|Escapes death once every eight years|heal=70
a45|a|1|5|มือนิ่ง|Steady Hands|มินิเกมแบบจังหวะง่ายขึ้น|Timing minigames feel easier|mgz=1.12,mgs=.03
a46|a|3|5|ผู้เลือกจังหวะ|Chooser of Moments|เห็นผล ศัตรูอ่อนลง และมินิเกมช้าลง|Sees, weakens, and slows|seer=1,duel=.94,mgz=1.1
a47|a|1|6|ผู้นำโชค|Luck Bringer|คนที่แต่งงานกับคุณร่ำรวยขึ้น ส่วนคุณไม่|Your spouse prospers; you don't|mon=900@mar,pw=-.3@mar
a48|a|2|6|พ่อแม่ของอัจฉริยะ|Parent of Prodigies|ลูกทุกคนเก่ง แต่คุณเหนื่อยขึ้น|Your children shine; you tire|fame=25@kid,dmg=1@kid
a49|a|1|6|หมาป่าเดียวดาย|Lone Wolf|เก่งขึ้นเมื่ออยู่คนเดียว|Stronger alone|pw=1.6@sgl,pw=-.6@mar
a50|a|2|6|คู่ชีวิตคือเกราะ|Partner as Shield|แต่งงานแล้วแทบไม่บาดเจ็บ|Married, you barely bleed|dmg=-2@mar,heal=40@mar
a51|a|1|6|เพื่อนทั้งเมือง|Friend to the Whole Town|ทุกคนรักคุณ แต่ไม่มีใครกลัว|Loved by all, feared by none|cha=4,fame=6,duel=1.05
a52|a|3|6|สายใยร้อยชาติ|Thread of a Hundred Lives|คนที่คุณรักเกิดมาเจอคุณทุกชาติ|The one you love finds you every life|cha=5,life=6@mar
a53|a|2|6|ครูที่ไม่มีวันเกษียณ|Teacher Without End|ยิ่งแก่ ยิ่งมีศิษย์ ยิ่งดัง|The older, the more students and fame|fame=30@gt50,int=2
a54|a|1|6|ลูกกตัญญู|Devoted Child|มีลูกแล้วชีวิตดีขึ้นทุกด้าน|Life improves once you have children|mon=500@kid,kar=3@kid
a55|a|9|6|โชคดูดเพื่อน|Luck Leech|คุณโชคดีขึ้นทุกครั้งที่คนรอบตัวโชคร้าย|Your luck rises as others' falls|pw=2,mon=500,kar=-10
a56|a|2|6|ยิ่งจนยิ่งเก่ง|Strength in Poverty|เงินน้อยเมื่อไหร่ ฝีมือยิ่งพุ่ง|The less money, the more skill|pw=2.5@poor,pw=-.5@rich
a57|a|2|6|ยิ่งรวยยิ่งอ่อน|Softened by Wealth|สบายแล้วฝีมือตก แต่เงินไม่เคยขาด|Comfort dulls you, money never runs out|mon=1500,pw=-1@rich
a58|a|1|6|ใจบุญใจกล้า|Brave Heart, Good Heart|กรรมดีเท่าไหร่ ยิ่งไม่กลัวใคร|The kinder you are, the braver|duel=.9@kp,duel=1.1@kn
a59|a|1|6|เงามืด|Shadow Blood|กรรมชั่วทำให้แข็งแกร่ง|Evil makes you strong|pw=2@kn,pw=-.5@kp
a60|a|2|6|ผู้คุ้มครองเด็ก|Guardian of Children|มีลูกแล้วไม่มีใครทำร้ายคุณได้ง่าย|With children, few can hurt you|duel=.88@kid
a61|a|1|7|ชิ้นจันทร์|Moon Shard|ครึ่งหนึ่งของบางอย่าง|Half of something|int=2@night
a62|a|1|7|ชิ้นตะวัน|Sun Shard|อีกครึ่งหนึ่งของบางอย่าง|The other half of something|pw=.8@day
a63|a|1|7|เปลวไฟในลมหายใจ|Flame in the Breath|ร้อนจากข้างใน|Warm from within|hp=25
a64|a|1|7|น้ำแข็งในกระดูก|Ice in the Bones|เย็นจากข้างใน|Cold from within|life=3
a65|a|1|7|ขนนกบนบ่า|Feather on the Shoulder|เบาจนลมพัดได้|Light enough for the wind|mgz=1.05
a66|a|1|7|หินในกำมือ|Stone in the Fist|หนักจนแผ่นดินรู้สึก|Heavy enough for the earth to notice|duel=.97
a67|a|2|7|ตาซ้ายของมังกร|Dragon's Left Eye|เห็นครึ่งหนึ่งของความจริง|Sees half the truth|int=3
a68|a|2|7|ตาขวาของมังกร|Dragon's Right Eye|เห็นอีกครึ่งหนึ่ง|Sees the other half|seer=1
a69|a|1|7|เสียงกลอง|Drumbeat|หัวใจเต้นเป็นจังหวะ|A heart that keeps the beat|mgs=.04
a70|a|1|7|เสียงขลุ่ย|Flute Note|ลมหายใจเป็นทำนอง|Breath like a melody|cha=2
a71|a|2|7|เงาที่ไม่ใช่ของตัวเอง|Borrowed Shadow|เงาของคุณเป็นของใครอีกคน|Your shadow belongs to someone else|kar=-1,int=2
a72|a|2|7|กุญแจไม่มีประตู|Key Without a Door|รอประตูที่ใช่|Waiting for the right door|mon=200
a73|a|1|7|รากไม้|Root|ยึดแผ่นดิน|Holds the earth|hp=20,life=2
a74|a|1|7|ใบไม้|Leaf|รับแสง|Drinks the light|kar=2
a75|a|2|7|ครึ่งตราประทับ|Half a Seal|ตราที่ถูกตัดครึ่ง|A seal cut in two|fame=4
a76|a|2|7|อีกครึ่งตราประทับ|Other Half of the Seal|รอยตัดตรงกันพอดี|The cut fits perfectly|fame=4
a77|a|1|7|เมฆ|Cloud|ลอยไปไม่หยุด|Never stops drifting|mgz=1.04
a78|a|1|7|ภูเขา|Mountain|ไม่เคยขยับ|Never moves|hp=30
a79|a|3|7|หัวใจสองดวง|Two Hearts|มีหัวใจสำรองหนึ่งดวง|You carry a spare heart|heal=35,hp=20
a80|a|9|7|ตราบาป|Mark of Sin|ทุกคนรู้ว่าคุณทำอะไรไว้|Everyone knows what you did|kar=-5,duel=.92
m01|m|1|2|ดาบหักทุกเล่ม|Every Blade Breaks|อาวุธทุกชิ้นพัง แต่หมัดเปล่าแรงกว่าคนถือดาบ|Every weapon breaks; bare fists hit harder|duel=.9,mon=-200
m02|m|2|2|ปราณร้อนเกินตัว|Overheated Qi|ปราณพุ่งแรงแต่ธาตุไฟเข้าแทรกง่าย|Qi surges, deviation comes easy|pw=2.4,dmg=3@p30
m03|m|1|2|ศิษย์ที่อาจารย์ไม่รัก|The Unloved Disciple|เรียนเองหมดทุกอย่าง|Learns everything alone|int=3,fame=-4
m04|m|2|2|จอมยุทธ์เมาค้าง|Hungover Hero|ยิ่งเมายิ่งเก่ง แต่ตื่นมาลืมทุกอย่าง|Better drunk, forgets everything after|duel=.86@p30,int=-2
m05|m|9|2|เลือดมาร|Demon Blood|พลังมหาศาล ฝ่ายธรรมะล่าคุณตลอดชีวิต|Immense power; the orthodox hunt you forever|pw=3.2,kar=-6,dmg=2
m06|m|1|3|กระบี่ไม้ไผ่|Bamboo Sword|ดาบไม้ที่จะกลายเป็นอะไรสักอย่าง|A wooden sword becoming something|pw=.5|ev:m06k,m06m,m06p
m07|m|2|3|คัมภีร์ขาดครึ่ง|Half a Manual|ครึ่งที่หายไปจะเติมเองตามทางที่เลือก|The missing half writes itself|int=2|ev:m07k,m07m,m07p
m08|m|1|4|???|???|อาจารย์ลับที่ยังไม่โผล่|A secret master yet to appear||hd:a20>m08h
m09|m|2|4|???|???|วิชาที่ร่างจำได้แต่ใจลืม|An art the body remembers||hd:low>m09h
m10|m|2|5|อ่านกระบวนท่า|Reads Every Stance|ศัตรูอ่อนลงและเห็นผลก่อนดวล|Foes weaken; you see the odds|duel=.9,seer=1
m11|m|1|5|ฝีเท้าลมกรด|Gale Steps|มินิเกมช้าลงเหมือนวิชาตัวเบา|Lightness art slows the world|mgz=1.18
m12|m|2|6|ศิษย์ร้อยคน|A Hundred Disciples|ยิ่งแก่ยิ่งมีศิษย์ แต่ไม่มีเวลาฝึกเอง|More students with age, less training|fame=25@gt30,pw=-.4@gt30
m13|m|1|6|มือขวาของประมุข|Patriarch's Right Hand|เก่งเมื่อมีคนให้รับใช้|Shines when serving someone|mon=500@mar,kar=2
m14|m|1|7|ตราสำนักแตก|Broken Sect Seal|ชิ้นส่วนของสำนักที่หายไป|A piece of a lost sect|fame=3
m15|m|1|7|ป้ายหยกครึ่งซีก|Half a Jade Token|อีกซีกอยู่ที่ใคร|Who holds the other half?|mon=250
x01|x|2|2|รากวิญญาณสวรรค์ชิงชัง|Heaven-Hated Root|บำเพ็ญเร็วผิดปกติ ฟ้าเลยไม่ชอบหน้า|Cultivates absurdly fast; heaven resents it|pw=2.6,dmg=3
x02|x|1|2|ฟ้าลืมชื่อ|Forgotten by Heaven|ไม่มีใครจำคุณได้ แต่ทัณฑ์สวรรค์ก็จำไม่ได้|No one remembers you — not even tribulations|heal=40,fame=-8
x03|x|2|2|เซียนขี้เกียจ|Lazy Immortal|อายุยืนมาก แต่บำเพ็ญช้า|Lives forever, cultivates slowly|life=40,pw=-.6
x04|x|9|2|โอสถเป็นพิษ|Poison-Pill Body|กินโอสถแล้วเก่ง แต่ร่างพังทีละน้อย|Pills make you strong, and slowly ruin you|pw=3,dmg=3,life=-15
x05|x|1|2|ใจไม่นิ่ง|Restless Heart|ฉลาดมาก แต่สมาธิสั้น|Brilliant, but scattered|int=4,mgz=.92
x06|x|1|3|เมล็ดบัวพันปี|Thousand-Year Lotus Seed|จะบานเป็นดอกตามใจผู้บำเพ็ญ|Blooms to match its cultivator|life=3|ev:x06k,x06m,x06p
x07|x|2|3|ลูกแก้วขุ่น|Clouded Orb|จะใสหรือดำ ขึ้นกับชีวิต|Turns clear or black with your life|int=1|ev:x07k,x07m,x07p
x08|x|2|4|???|???|เศษวิญญาณเซียนโบราณ|A shard of an ancient immortal||hd:a40>x08h
x09|x|1|4|???|???|ดาวที่ตกลงในทะเลจิต|A star in your sea of mind||hd:p8>x09h
x10|x|2|5|ใจเย็นดั่งน้ำแข็ง|Ice-Calm Mind|มินิเกมช้าลงและคะแนนดีขึ้น|Minigames slow and score better|mgz=1.2,mgs=.05
x11|x|2|5|ฟ้าผ่าไม่โดน|Lightning Misses You|รอดตายง่ายเหมือนทัณฑ์เมิน|Death misses you like stray lightning|heal=55
x12|x|1|6|คู่บำเพ็ญ|Dual Cultivator|มีคู่แล้วบำเพ็ญเร็วขึ้น|Cultivates faster with a partner|pw=1.8@mar,pw=-.3@sgl
x13|x|1|6|อาจารย์ของเซียน|Teacher of Immortals|ศิษย์ทุกคนไปไกลกว่าคุณ|Your students surpass you|fame=20@gt50,kar=3
x14|x|1|7|ขนหงส์|Phoenix Feather|ร้อนไม่ดับ|Burns without end|hp=30
x15|x|1|7|เกล็ดมังกร|Dragon Scale|แข็งไม่แตก|Hard and unbroken|duel=.96
w01|w|1|2|ไวไฟเต็มทุกที่|Full Wi-Fi Everywhere|ค้นอะไรก็เจอ แต่ไฟดับเมื่อไหร่หงุดหงิด|Finds anything online; blackouts enrage you|int=4,kar=-2@p30
w02|w|2|2|ไวรัลง่าย|Goes Viral Easily|ดังเร็ว แต่ดราม่าก็เร็ว|Famous fast, dramas faster|fame=20,kar=-3@p30,mon=600@p30
w03|w|1|2|นักลงทุนสายมู|Superstitious Investor|เชื่อดวงแล้วได้เงิน…บ้าง|Trusts the stars; sometimes it pays|mon=1500@p30,mon=-600@p30
w04|w|9|2|ทำงานไม่หยุด|Never Clocks Out|รวยมาก แต่ร่างกายพัง|Rich, and wrecked|mon=2200,dmg=3,life=-10
w05|w|1|2|ยอดฝีมือติดเกม|Master Gamer|มินิเกมเก่งมาก แต่ไม่ได้นอน|Elite at minigames, never sleeps|mgs=.1,dmg=1
w06|w|1|3|บัญชีโซเชียลว่างเปล่า|Empty Social Account|จะกลายเป็นอะไรขึ้นกับสิ่งที่คุณโพสต์|Becomes whatever you post|fame=2|ev:w06k,w06m,w06p
w07|w|2|3|ไอเดียสตาร์ทอัพ|Startup Idea|ไอเดียที่ยังไม่รู้ว่าจะไปทางไหน|An idea without a direction|mon=200|ev:w07k,w07m,w07p
w08|w|1|4|???|???|ประวัติที่ถูกลบไปจากระบบ|A record erased from the system||hd:a30>w08h
w09|w|2|4|???|???|ข้อความจากเบอร์ที่ไม่มีอยู่จริง|Texts from a number that doesn't exist||hd:p8>w09h
w10|w|2|5|อ่านเกมไว|Fast Read|เห็นผลก่อนดวลและมินิเกมช้าลง|Sees the odds; minigames slow|seer=1,mgz=1.1
w11|w|1|5|นิ้วไว|Fast Fingers|คะแนนมินิเกมสูงขึ้น|Better minigame scores|mgs=.08
w12|w|1|6|ครอบครัวทำธุรกิจ|Family Business|มีลูกแล้วธุรกิจรุ่ง|Business booms with kids|mon=1200@kid
w13|w|2|6|อินฟลูฯ คู่รัก|Couple Influencer|แต่งงานแล้วดังขึ้นเรื่อยๆ|Fame grows with marriage|fame=30@mar,cha=2@mar
w14|w|1|7|ซิมการ์ดเก่า|Old SIM Card|ยังมีสัญญาณจากที่ไหนสักแห่ง|Still gets signal from somewhere|int=2
w15|w|1|7|พาวเวอร์แบงก์ไม่มีวันหมด|Endless Power Bank|ชาร์จได้ตลอดกาล|Never runs out|hp=20
s01|s|2|2|วิญญาณกินวิญญาณ|Soul-Eating Spirit|วงแหวนแข็งแรงขึ้น แต่ดวงจิตหิวตลอด|Rings grow strong; your spirit always hungers|pw=2.4,dmg=2
s02|s|1|2|ดวงจิตขี้อาย|Shy Spirit|ไม่ค่อยยอมออกมาตอนสู้ แต่ช่วยตอนฝึก|Hides in fights, helps in training|pw=1.6,duel=1.06
s03|s|9|2|ดวงจิตต้องคำสาป|Cursed Spirit|ทรงพลังเกินคน แต่กัดเจ้าของ|Too strong for a human; bites its owner|pw=3.4,dmg=3,kar=-4
s04|s|1|2|วิญญาณเด็ก|Childlike Spirit|เรียนรู้เร็ว แต่ซน|Learns fast, makes mischief|int=3,mon=-150
s05|s|2|2|ดวงจิตสองบุคลิก|Two-Faced Spirit|ปีคี่ใจดี ปีคู่ดุร้าย|Gentle in odd years, savage in even|duel=.85@even,kar=-4@even,kar=4@odd
s06|s|1|3|วงแหวนเปล่า|Empty Ring|วงแหวนที่จะเลือกสีของมันเอง|A ring that will choose its own color|pw=.5|ev:s06k,s06m,s06p
s07|s|2|3|ไข่สัตว์วิญญาณ|Spirit Beast Egg|ฟักเป็นอะไรขึ้นกับผู้เลี้ยง|Hatches by its keeper's nature|hp=10|ev:s07k,s07m,s07p
s08|s|2|4|???|???|กระดูกวิญญาณที่ยังหลับ|A sleeping soul bone||hd:a35>s08h
s09|s|1|4|???|???|เสียงจากวงแหวนที่ไม่มี|A voice from a ring you don't have||hd:low>s09h
s10|s|2|5|ตาวิญญาณ|Spirit Eyes|เห็นผลก่อนดวลเสมอ|Always sees the odds|seer=1,duel=.95
s11|s|1|5|ลมปราณยาว|Long Breath|มินิเกมช้าลง|Minigames slow|mgz=1.15
s12|s|1|6|คู่วิญญาณ|Soul Partner|มีคู่แล้วพลังวิญญาณพุ่ง|A partner lifts your soul power|pw=1.6@mar
s13|s|2|6|ผู้ปลุกวิญญาณคนอื่น|Awakener of Others|ลูกศิษย์ปลุกดวงจิตได้แรง และคุณดังขึ้น|Students awaken strongly; you grow famous|fame=22@gt30
s14|s|1|7|ขนสัตว์วิญญาณ|Spirit Beast Fur|อุ่นจากชีวิตอื่น|Warm from another life|hp=20
s15|s|1|7|เขี้ยวสัตว์วิญญาณ|Spirit Beast Fang|คมจากชีวิตอื่น|Sharp from another life|duel=.96
k01|k|2|2|หัวใจอุกกาบาต|Meteor Heart|ยีนขึ้นเร็ว แต่สัตว์กลายพันธุ์ได้กลิ่นคุณ|Genes rise fast; mutants smell you|pw=2.6,dmg=2
k02|k|1|2|ลูกสลัมหัวไว|Slum-Smart Kid|เอาตัวรอดเก่ง แต่ไม่เคยรวย|Survives anything, never rich|heal=45,mon=-200
k03|k|9|2|ยีนกบฏ|Rebel Gene|พลังพุ่งแต่ร่างปฏิเสธตัวเอง|Power surges; body rejects itself|pw=3.4,dmg=4,life=-12
k04|k|1|2|ตาเรดาร์|Radar Eyes|เห็นอุกกาบาตก่อนใคร แต่ปวดหัวตลอด|Spots meteors first, constant headaches|mgs=.1,dmg=1
k05|k|2|2|ทหารกำแพง|Wall Soldier|เก่งตอนสู้ แต่เงินเดือนน้อย|Great in a fight, poorly paid|duel=.88,mon=-250
k06|k|1|3|ชิ้นอุกกาบาตในมือ|Meteor Shard in Hand|หินที่เปลี่ยนตามผู้ถือ|A stone that changes with its holder|pw=.5|ev:k06k,k06m,k06p
k07|k|2|3|ยีนหลับ|Dormant Gene|ยีนที่รอทิศทาง|A gene awaiting direction|int=1|ev:k07k,k07m,k07p
k08|k|2|4|???|???|รหัสในเลือด|A code in your blood||hd:a30>k08h
k09|k|1|4|???|???|สัญญาณจากนอกกำแพง|A signal from beyond the wall||hd:p8>k09h
k10|k|2|5|นักวิเคราะห์สนามรบ|Battlefield Analyst|เห็นผลก่อนดวล|Sees every outcome first|seer=1,duel=.94
k11|k|1|5|รีเฟล็กซ์ยีน|Gene Reflex|มินิเกมช้าลง|Minigames slow|mgz=1.15
k12|k|1|6|หัวหน้าสลัม|Slum Boss|มีลูกแล้วคนสลัมยิ่งภักดี|Kids make the slum loyal to you|fame=20@kid,mon=600@kid
k13|k|2|6|คู่หูนักล่า|Hunter Partner|แต่งงานแล้วล่าเก่งขึ้น|Married hunters hunt better|duel=.86@mar
k14|k|1|7|ชิปทหารเก่า|Old Military Chip|ยังทำงานอยู่|Still running|int=2
k15|k|1|7|เศษกำแพงชั้นใน|Inner Wall Fragment|แข็งที่สุดในเมือง|The hardest thing in the city|hp=30
f01|f|1|2|เงาไม่ตามตัว|Shadow That Wanders|เงามีชีวิตของมันเอง บางปีช่วย บางปีป่วน|Your shadow has its own life — helps, or meddles|pw=2@p30,mon=-400@p30
f02|f|2|2|ปอดหมอก|Fog Lungs|หายใจหมอกได้สบาย แต่เกลียดแดด|Breathes fog easily, hates the sun|pw=2@night,pw=-.8@day
f03|f|9|2|สัญญากับบ่อน้ำ|Pact with the Well|เหรียญมาทุกปี แต่ความทรงจำหายไปเรื่อยๆ|Coins every year; memories drain away|mon=1500,int=-4
f04|f|1|2|ช่างมือไว|Quick Tinkerer|ซ่อมอะไรก็ได้ แต่นิ้วเป็นแผลตลอด|Fixes anything, fingers always cut|mgs=.08,dmg=1
f05|f|2|2|นักข่าวหมอก|Fog Reporter|รู้ความลับทุกคน แต่ทุกคนอยากปิดปากคุณ|Knows everyone's secrets; everyone wants you silent|int=4,dmg=2@p30
f06|f|1|3|เฟืองไร้หน้าที่|Purposeless Gear|เฟืองที่หาเครื่องของตัวเองอยู่|A gear seeking its machine|mon=150|ev:f06k,f06m,f06p
f07|f|2|3|นาฬิกาเดินถอยหลัง|Backward Clock|จะเดินไปทางไหนขึ้นกับคุณ|Which way it turns depends on you|life=2|ev:f07k,f07m,f07p
f08|f|2|4|???|???|จดหมายที่ส่งถึงคุณจากอนาคต|A letter addressed to you from the future||hd:a30>f08h
f09|f|1|4|???|???|ประตูหลังร้านที่ไม่เคยเปิด|A back door that never opens||hd:rich>f09h
f10|f|2|5|เห็นทะลุหมอก|Sees Through Fog|เห็นผลก่อนดวลและศัตรูอ่อนลง|Sees the odds; foes weaken|seer=1,duel=.92
f11|f|1|5|มือวาล์ว|Valve Hands|มินิเกมช้าลง|Minigames slow|mgz=1.15
f12|f|1|6|ครอบครัวช่างกล|Family of Artificers|ลูกทุกคนเป็นช่าง ร้านรุ่ง|All your kids tinker; the shop thrives|mon=1000@kid
f13|f|2|6|คู่สมาคมลับ|Secret-Society Couple|แต่งงานแล้วเข้าถึงความลับ|Marriage opens secret doors|int=4@mar,fame=10@mar
f14|f|1|7|ทองเหลืองขึ้นสนิม|Rusted Brass|เก่าแต่ยังใช้ได้|Old, still works|hp=20
f15|f|1|7|ไอน้ำในขวด|Bottled Steam|ร้อนอยู่เสมอ|Always hot|pw=.5
b01|b|2|2|จำได้ว่าเคยเป็นคน|Remembers Being Human|ฉลาดเกินสัตว์ แต่ฝูงไม่ไว้ใจ|Too clever for a beast; the pack distrusts you|int=5,duel=1.05
b02|b|1|2|เขี้ยวยาวเกิน|Overlong Fangs|กัดแรงแต่กินยาก|Bites hard, eats badly|duel=.88,dmg=1
b03|b|9|2|เลือดอสูรบ้า|Berserk Beast Blood|คลั่งได้ทุกเมื่อ ทั้งดีและร้าย|Frenzy strikes anytime, good or bad|pw=3.2,dmg=3@p30,kar=-4
b04|b|1|2|ขนสวยเกินไป|Too Beautiful a Coat|สวยจนนายพรานตามล่า|So beautiful that hunters chase you|cha=5,dmg=2@p30
b05|b|2|2|หลับยาว|Long Sleeper|อายุยืนแต่ตื่นช้า|Long life, slow to wake|life=30,pw=-.5
b06|b|1|3|ลูกไข่ที่ยังไม่ฟัก|Unhatched Egg|ร่างจะเปลี่ยนตามการเอาชีวิตรอด|Your form follows how you survive|hp=10|ev:b06k,b06m,b06p
b07|b|2|3|เขาที่ยังไม่งอก|Unsprouted Horn|เขาที่รอเลือกรูปทรง|A horn waiting to take shape|pw=.4|ev:b07k,b07m,b07p
b08|b|2|4|???|???|เสียงหอนในความฝัน|A howl in your dreams||hd:a50>b08h
b09|b|1|4|???|???|รอยเท้าที่ไม่ใช่สัตว์|Footprints that aren't an animal's||hd:low>b09h
b10|b|2|5|จมูกล่า|Hunter's Nose|รู้ก่อนว่าจะชนะไหม|Smells victory before the fight|seer=1,duel=.94
b11|b|1|5|ประสาทสัตว์ป่า|Wild Reflexes|มินิเกมช้าลง|Minigames slow|mgz=1.18
b12|b|1|6|จ่าฝูงผู้ปกป้อง|Protective Alpha|มีลูกแล้วแทบไม่มีใครกล้าเข้าใกล้|With cubs, few dare approach|duel=.85@kid
b13|b|2|6|คู่ชีวิตตลอดกาล|Mate for Life|มีคู่แล้วอายุยืนขึ้นมาก|A mate lengthens your life greatly|life=20@mar
b14|b|1|7|ขนนกหลงฝูง|Stray Feather|หลุดมาจากนกตัวอื่น|Fell from another bird|mgz=1.04
b15|b|1|7|หินอุ่นในถ้ำ|Warm Cave Stone|อุ่นตลอดฤดูหนาว|Warm all winter|hp=25
r01|r|2|2|ย้อนกาลแล้วเพี้ยน|Glitched Regression|ทุกครั้งที่ย้อน โลกเปลี่ยนนิดหนึ่ง|Each loop changes the world slightly|pw=2.2,int=-2@p30
r02|r|1|2|ความจำรั่ว|Leaky Memory|จำอนาคตได้ แต่ลืมชื่อคนรอบตัว|Remembers the future, forgets names|int=4,cha=-2
r03|r|9|2|เวลาไม่พอ|Not Enough Time|เก่งเร็วมาก แต่ชีวิตแต่ละรอบสั้น|Grows fast, each loop is short|pw=3.4,life=-18
r04|r|1|2|เจ็บซ้ำ|Repeated Wounds|แผลจากรอบก่อนยังเจ็บ แต่ทำให้แกร่ง|Past-loop wounds still ache, and harden you|hp=50,dmg=2
r05|r|2|2|รู้มากเกินไป|Knows Too Much|รู้อนาคตจนคนกลัว|Knows the future; people fear you|seer=1,cha=-3
r06|r|1|3|ความทรงจำแตก|Shattered Memory|เศษความทรงจำที่ประกอบใหม่ตามทางเลือก|Memory shards reassembled by your choices|int=1|ev:r06k,r06m,r06p
r07|r|2|3|นาฬิกาทราย|Hourglass|ทรายที่เลือกทางไหลเอง|Sand that chooses where to fall|life=2|ev:r07k,r07m,r07p
r08|r|2|4|???|???|รอบที่คุณจำไม่ได้|A loop you don't remember||hd:a30>r08h
r09|r|1|4|???|???|คนที่ย้อนกาลมาเหมือนคุณ|Someone who loops like you||hd:p8>r09h
r10|r|2|5|เดจาวู|Déjà Vu|เห็นผลก่อนดวลเพราะเคยเห็นแล้ว|You've seen this fight before|seer=1,duel=.9
r11|r|1|5|ซ้อมมาแล้วร้อยรอบ|Rehearsed a Hundred Times|มินิเกมง่ายขึ้นมาก|Minigames feel rehearsed|mgz=1.2,mgs=.04
r12|r|1|6|ช่วยคนที่ตายทุกรอบ|Saver of the Doomed|มีคู่หรือลูกแล้วกรรมดีพุ่ง|Family lifts your karma|kar=6@mar,kar=6@kid
r13|r|2|6|ศัตรูที่ย้อนตาม|Enemy Who Loops Too|ศัตรูก็จำได้ แต่คุณเรียนรู้จากเขา|Your enemy remembers too; you learn from him|int=3,duel=1.04
r14|r|1|7|เศษเข็มนาฬิกา|Clock Hand Shard|หยุดเวลาได้หนึ่งวินาที|Stops time for one second|mgz=1.05
r15|r|1|7|ทรายจากรอบแรก|Sand from the First Loop|ทรายที่ไม่เคยตก|Sand that never falls|life=3
`;
// ร่างวิวัฒน์ (อายุ 30: k=ใจดี m=รวย p=อื่นๆ) และร่างซ่อนที่เผยออกมา — ไม่ถูกสุ่มตอนเกิด
window.XT_FORMS=`
a21k|ต้นโพธิ์ร่มเย็น|Shade-Giving Bodhi|ทุกคนมาพักใต้ร่มคุณ|kar=6,life=6
a21m|ต้นไม้เงินไหล|Money Tree|ใบไม้กลายเป็นเหรียญ|mon=1500
a21p|ไม้หนามพันปี|Thousand-Year Thorn|ใครแตะก็เจ็บ|pw=2,duel=.92
a22k|นกกระเรียนขาว|White Crane|บินสูงเหนือความแค้น|kar=5,life=5
a22m|ไก่ทองคำ|Golden Hen|ออกไข่เป็นทองทุกปี|mon=1300
a22p|นกอินทรีเพลิง|Fire Eagle|เกิดมาเพื่อล่า|pw=2.2,seer=1
a23k|แผลศักดิ์สิทธิ์|Holy Scar|แผลที่รักษาคนอื่นได้|heal=60,kar=4
a23m|แผลประดับทอง|Gilded Scar|แผลที่คนยอมจ่ายเพื่อฟังเรื่องเล่า|mon=900,fame=10
a23p|แผลนักรบ|Warrior's Scar|ยิ่งเจ็บยิ่งแกร่ง|hp=80,duel=.9
a24k|ดาวรุ่งอรุณ|Morning Star|นำทางคนหลงทาง|kar=5,fame=15
a24m|ดาวพ่อค้า|Merchant's Star|ส่องทางไปหาเงิน|mon=1200,fame=5
a24p|ดาวหาง|Comet|ผ่านไปเร็วแต่ไม่มีใครลืม|pw=2.4,fame=20
a25k|ร่างนักบุญ|Saint's Form|ฟ้าปั้นคุณเป็นคนดี|kar=10,life=10,heal=50
a25m|ร่างจักรพรรดิทอง|Golden Emperor's Form|ฟ้าปั้นคุณให้ครองทรัพย์|mon=2500,fame=15
a25p|ร่างเทพสงคราม|War God's Form|ฟ้าปั้นคุณเพื่อสงคราม|pw=3.5,duel=.88
a26k|ความเมตตาจนเป็นนิสัย|Habitual Mercy|ช่วยโดยไม่ต้องคิด|kar=5,cha=3
a26m|นิสัยเก็บออม|Habitual Thrift|เงินไม่เคยรั่ว|mon=800
a26p|นิสัยไม่ยอมแพ้|Habit of Never Yielding|ล้มกี่ครั้งก็ลุก|heal=45,pw=1
a27k|เสียงของพระโพธิสัตว์|Voice of a Bodhisattva|สอนให้ให้อภัย|kar=6,int=4
a27m|เสียงของเจ้าสัว|Voice of a Tycoon|สอนให้รวย|mon=1000,int=3
a27p|เสียงของจอมยุทธ์โบราณ|Voice of an Ancient Master|สอนให้ฆ่า|pw=2.4,int=3
a28k|รากโพธิ์|Bodhi Root|ร่มเย็นถึงลูกหลาน|kar=4,life=8
a28m|รากทอง|Golden Root|ดูดทองจากดิน|mon=1100
a28p|รากเหล็ก|Iron Root|ไม่มีอะไรโค่นได้|hp=90,heal=40
a29h|สายเลือดราชวงศ์ที่ล่มสลาย|Blood of a Fallen Dynasty|เผยตอนอายุ 40|fame=30,mon=900
a30h|ร่างที่ไม่ยอมตาย|Body That Refuses Death|เผยตอนใกล้ตาย|heal=80,hp=60
a31h|คู่แท้จากชาติก่อน|True Mate from a Past Life|เผยเมื่อแต่งงาน|cha=6,life=10,kar=4
a32h|ดวงดาวคุ้มครอง|Guardian Star|เผยเมื่อฟ้าอยากเผย|pw=1.8,heal=40
a33h|ร่างอวตาร|Avatar Body|เผยตอนอายุ 60|pw=4,life=15,fame=40
a34h|วิญญาณผู้พิทักษ์ตระกูล|Clan Guardian Spirit|เผยเมื่อมีลูก|duel=.85,kar=5
a35h|ตราเศรษฐีโบราณ|Ancient Tycoon's Seal|เผยเมื่อร่ำรวย|mon=2500
a36h|ผีที่ใช้ร่างเดียวกับคุณ|A Ghost Sharing Your Body|เผยตอนอายุ 25 — ต้องสาป|pw=2.5,kar=-6,dmg=2
m06k|กระบี่ไม้ศักดิ์สิทธิ์|Sacred Wooden Sword|ไม่เคยฆ่าใคร แต่ไม่เคยแพ้|duel=.88,kar=4
m06m|กระบี่ประดับเพชร|Jeweled Sword|ขายได้ราคาเท่าเมืองหนึ่ง|mon=1600
m06p|กระบี่ไผ่เลือด|Blood Bamboo Sword|ดื่มเลือดแล้วแข็งกว่าเหล็ก|pw=2.6,duel=.9
m07k|คัมภีร์พุทธะ|Buddha's Manual|ครึ่งหลังเขียนว่า "ปล่อยวาง"|kar=6,life=8,int=3
m07m|คัมภีร์การค้า|Merchant's Manual|ครึ่งหลังเป็นบัญชีรายรับ|mon=1400,int=3
m07p|คัมภีร์มาร|Demon's Manual|ครึ่งหลังเขียนด้วยเลือด|pw=3,kar=-4
m08h|อาจารย์ลับในศาลเจ้าร้าง|Secret Master in a Ruined Shrine|เผยตอนอายุ 20|pw=2.2,int=4
m09h|วิชาจากชาติก่อน|Art from a Past Life|เผยตอนใกล้ตาย|pwx=8,duel=.9
x06k|บัวขาวบริสุทธิ์|Pure White Lotus|ใจสงบ อายุยืน|life=25,kar=5
x06m|บัวทองคำ|Golden Lotus|ขายกลีบละพันตำลึง|mon=1500,life=8
x06p|บัวเพลิงมาร|Demonfire Lotus|บานในเลือด|pw=3,dmg=1
x07k|ลูกแก้วใส|Clear Orb|เห็นใจคน|int=5,kar=4
x07m|ลูกแก้วสมบัติ|Treasure Orb|ดึงดูดทรัพย์|mon=1300
x07p|ลูกแก้วดำ|Black Orb|ดูดพลังคนอื่น|pw=2.8,kar=-3
x08h|เศษวิญญาณเซียนโบราณ|Ancient Immortal's Shard|เผยตอนอายุ 40|pw=2.8,life=20
x09h|ดาวในทะเลจิต|Star in the Sea of Mind|เผยเมื่อฟ้าอยากเผย|int=6,mgz=1.15
w06k|เพจทำดี|Do-Good Page|ช่วยคนจนดัง|kar=5,fame=20
w06m|ร้านค้าออนไลน์|Online Store|ยอดขายทุกวัน|mon=1800
w06p|ช่องรีวิวสุดโหด|Savage Review Channel|ใครก็กลัว|fame=30,duel=.94
w07k|มูลนิธิ|Foundation|ทำดีแล้วรวยใจ|kar=6,fame=15
w07m|ยูนิคอร์น|Unicorn Startup|มูลค่าพันล้าน|mon=3000
w07p|บริษัทรักษาความปลอดภัย|Security Firm|ทีมยอดฝีมือ|pw=2.2,duel=.9
w08h|ประวัติสายลับรัฐ|State Agent's File|เผยตอนอายุ 30|seer=1,int=5,mon=800
w09h|เบอร์จากอนาคต|Number from the Future|เผยเมื่อฟ้าอยากเผย|mon=1500@p30,int=4
s06k|วงแหวนขาวพิทักษ์|White Guardian Ring|ปกป้องทุกคน|heal=55,kar=4
s06m|วงแหวนทองล่าสมบัติ|Golden Treasure Ring|เจอของมีค่าตลอด|mon=1300
s06p|วงแหวนแดงสังหาร|Crimson Slayer Ring|เกิดมาฆ่า|pw=3,duel=.9
s07k|กิเลนน้อย|Little Qilin|นำโชคมาให้คนรอบตัว|kar=5,cha=4
s07m|คางคกทอง|Golden Toad|คายเหรียญ|mon=1400
s07p|หมาป่าเงา|Shadow Wolf|ล่าในความมืด|pw=2.6,seer=1
s08h|กระดูกวิญญาณมังกร|Dragon Soul Bone|เผยตอนอายุ 35|pw=3,hp=60
s09h|วงแหวนผี|Ghost Ring|เผยตอนใกล้ตาย|heal=70,pw=1.5
k06k|หินพิทักษ์เมือง|City Ward Stone|ปกป้องสลัม|kar=6,fame=15
k06m|อุกกาบาตหายาก|Rare Meteorite|ขายให้ห้องแล็บ|mon=2000
k06p|หินสงคราม|War Stone|ติดอาวุธ|pw=2.8,duel=.9
k07k|ยีนเยียวยา|Healing Gene|รักษาคนอื่นได้|heal=60,kar=5
k07m|ยีนนักธุรกิจ|Business Gene|เห็นตลาด|mon=1500,int=3
k07p|ยีนนักล่า|Hunter Gene|ล่าไม่พลาด|pw=3,seer=1
k08h|รหัสต้นแบบ|Prototype Code|เผยตอนอายุ 30|pw=3,mgz=1.15
k09h|สัญญาณเรียกกลับ|Recall Signal|เผยเมื่อฟ้าอยากเผย|int=6,fame=15
f06k|เฟืองหัวใจ|Heart Gear|ทำให้เครื่องจักรมีหัวใจ|kar=5,cha=4
f06m|เฟืองโรงกษาปณ์|Mint Gear|หมุนแล้วเหรียญออก|mon=1700
f06p|เฟืองปืนใหญ่|Cannon Gear|ยิงไกลที่สุดในเมือง|pw=2.6,duel=.9
f07k|นาฬิกาเยียวยา|Healing Clock|ย้อนแผลให้หาย|heal=60,life=6
f07m|นาฬิกาพ่อค้า|Merchant's Clock|รู้เวลาตลาดเปิด|mon=1400
f07p|นาฬิกาสงคราม|War Clock|รู้จังหวะศัตรู|seer=1,duel=.9
f08h|จดหมายจากอนาคต|Letter from the Future|เผยตอนอายุ 30|int=6,seer=1
f09h|ห้องลับหลังร้าน|Secret Back Room|เผยเมื่อร่ำรวย|mon=2200
b06k|ร่างกวางเทพ|Divine Deer Form|ป่าทั้งป่าคุ้มครอง|kar=6,life=20
b06m|ร่างคางคกทอง|Golden Toad Form|นำทรัพย์มาให้ฝูง|mon=1200,fame=10
b06p|ร่างพยัคฆ์เพลิง|Fire Tiger Form|เจ้าแห่งการล่า|pw=3,duel=.88
b07k|เขากิเลน|Qilin Horn|นำโชค|kar=5,heal=45
b07m|เขาหยก|Jade Horn|มีค่าเท่าภูเขา|mon=1500
b07p|เขาสายฟ้า|Thunder Horn|ฟ้าผ่าตามคำสั่ง|pw=3,seer=1
b08h|วิญญาณจ่าฝูงโบราณ|Ancient Alpha Spirit|เผยตอนอายุ 50|pw=3,fame=25
b09h|ร่างคนที่ซ่อนอยู่|Hidden Human Form|เผยตอนใกล้ตาย|heal=65,int=5
r06k|ความทรงจำของแม่|Mother's Memory|จำได้ว่าเคยถูกรัก|kar=6,life=8
r06m|ความทรงจำราคาหุ้น|Memory of Stock Prices|จำได้ว่าอะไรจะขึ้น|mon=2000
r06p|ความทรงจำสงคราม|War Memory|จำทุกท่าของศัตรู|duel=.86,seer=1
r07k|ทรายเยียวยา|Healing Sand|ย้อนแผลในร่าง|heal=60,life=8
r07m|ทรายทอง|Golden Sand|ทุกเม็ดเป็นทอง|mon=1500
r07p|ทรายเหล็ก|Iron Sand|ยิ่งไหลยิ่งคม|pw=3,duel=.92
r08h|รอบที่ศูนย์|Loop Zero|เผยตอนอายุ 30|pw=2.8,int=5
r09h|ผู้ย้อนกาลอีกคน|Another Regressor|เผยเมื่อฟ้าอยากเผย|seer=1,fame=20
`;
// คอมโบ: idA|idB|ชื่อไทย|ชื่ออังกฤษ|คำโปรยไทย|คำโปรยอังกฤษ|ผล
window.XT_COMBO=`
a61|a62|สุริยันจันทรา|Sun and Moon|กลางวันกลางคืนเป็นของคุณ|Day and night both belong to you|pw=2,int=3
a63|a64|ไฟน้ำแข็ง|Frozen Flame|ร้อนและเย็นในร่างเดียว|Heat and cold in one body|pw=1.5,life=10,hp=60
a65|a66|ขนนกกับหินผา|Feather and Stone|เบาเมื่อต้องหนี หนักเมื่อต้องสู้|Light to flee, heavy to fight|mgz=1.15,duel=.9
a67|a68|ดวงตามังกรคู่|Twin Dragon Eyes|เห็นความจริงทั้งหมด|Sees the whole truth|seer=1,int=6,duel=.9
a69|a70|ดนตรีแห่งชะตา|Music of Fate|ทุกการเคลื่อนไหวเป็นเพลง|Every move is music|mgs=.12,cha=5
a71|a72|ประตูในเงา|Door in the Shadow|เงาของคุณพาไปที่ที่ไม่มีใครเข้าได้|Your shadow leads where none can enter|mon=1200,int=4
a73|a74|ต้นไม้แห่งชีวิต|Tree of Life|เติบโตไม่หยุด|Grows without end|life=15,kar=4,hp=40
a75|a76|ตราประทับสมบูรณ์|The Whole Seal|ตราที่แผ่นดินต้องยอมรับ|A seal the land must honor|fame=40,mon=800
a77|a78|เมฆบนยอดเขา|Cloud on the Peak|นิ่งและเคลื่อนพร้อมกัน|Still and moving at once|mgz=1.15,hp=60
a79|a39|ร่างไม่รู้ตาย|Deathless Body|ตายยากจนคนลือว่าเป็นเซียน|So hard to kill people call you immortal|heal=95,life=10
a80|a55|มารร้ายเต็มตัว|Wholly Wicked|ทุกคนกลัว ทุกคนเกลียด|Feared and hated by all|pw=3,duel=.85,kar=-10
a37|a68|ผู้หยั่งรู้|The Omniscient|ไม่มีการต่อสู้ไหนที่คุณไม่รู้ผล|No fight's outcome escapes you|duel=.85,int=5
a42|a10|ปีศาจสนามรบ|Battlefield Demon|ศัตรูกลัวจนวิ่งหนี|Enemies flee on sight|duel=.82,fame=15
a49|a18|เงาไร้นาม|Nameless Shadow|เดินคนเดียว ไม่มีใครจำ แต่ไม่มีใครชนะ|Walks alone, forgotten, unbeaten|pw=2.5,duel=.88
a52|a31|รักข้ามร้อยชาติ|Love Across a Hundred Lives|ความรักที่ไม่มีวันจบ|A love that never ends|life=15,cha=8,kar=5
a56|a04|นักพรตยากไร้|Penniless Ascetic|ไม่มีอะไรเลย แต่แข็งแกร่งที่สุด|Owns nothing, strongest of all|pw=3,kar=6
a57|a09|เศรษฐีนอนตีพุง|Idle Tycoon|รวยโดยไม่ต้องทำอะไร|Rich without lifting a finger|mon=2500
a58|a51|วีรชนของประชาชน|People's Hero|ทุกคนพร้อมตายแทนคุณ|Everyone would die for you|fame=40,duel=.9,kar=5
a59|a06|จอมมารเจ้าเสน่ห์|Charming Demon Lord|ยิ่งชั่วยิ่งมีคนตาม|The worse you are, the more follow|cha=8,pw=2@kn
a40|a45|สมาธิไร้ที่ติ|Flawless Focus|มินิเกมแทบไม่พลาด|Minigames almost never fail|mgs=.15,mgz=1.15
a38|a41|หยุดเวลา|Stop Time|โลกช้าลงจนเห็นทุกอย่าง|The world slows until you see everything|mgz=1.45
a48|a54|ตระกูลรุ่งเรือง|Thriving Clan|ลูกหลานรุ่งเรืองทุกด้าน|Your line flourishes|mon=1500@kid,fame=30@kid
a50|a47|คู่สร้างคู่สม|Made for Each Other|คู่ชีวิตที่ฟ้าสร้างมา|A match heaven built|life=12@mar,mon=1000@mar
m14|m15|มรดกสำนักที่หายไป|Legacy of the Lost Sect|ป้ายและตรารวมกันเปิดคลังวิชา|Token and seal open a vault of arts|pwx=10,fame=30
m01|m10|หมัดไร้ดาบ|Fist Without Blade|ไม่ต้องใช้อาวุธก็ไร้เทียมทาน|Unbeatable without a weapon|duel=.8
x14|x15|หงส์มังกรคู่|Phoenix and Dragon|หยินหยางสมบูรณ์|Perfect yin and yang|pw=2.5,life=20
x12|a52|คู่เซียนนิรันดร์|Eternal Immortal Couple|บำเพ็ญคู่จนเป็นเซียนพร้อมกัน|Ascend together|pw=2@mar,life=30@mar
w14|w15|สัญญาณไม่มีวันขาด|Never Offline|ออนไลน์ตลอดกาล|Online forever|int=5,mon=1000
w01|w05|ยอดฝีมือดิจิทัล|Digital Master|ค้นทุกอย่าง เล่นทุกเกม|Knows all, beats all|mgs=.12,int=4
s14|s15|สัตว์วิญญาณในร่าง|Beast Within|ร่างครึ่งสัตว์ครึ่งคน|Half beast, half human|pw=2.5,hp=60
k14|k15|ทหารกำแพงสมบูรณ์แบบ|Perfect Wall Soldier|ชิปกับกำแพงรวมเป็นเกราะ|Chip and wall become armor|hp=100,duel=.88
f14|f15|เครื่องจักรไอน้ำมีชีวิต|Living Steam Engine|ทองเหลืองกับไอน้ำมีหัวใจ|Brass and steam with a heart|pw=2,mon=1000
b14|b15|รังนกในถ้ำ|Nest in the Cave|บ้านที่อุ่นที่สุดในป่า|The warmest home in the forest|life=20,heal=50
r14|r15|ผู้ควบคุมเวลา|Master of Time|หยุดเวลาได้นานขึ้น|Stops time longer|mgz=1.35,life=10
r10|r05|ผู้รู้ทุกรอบ|One Who Knows Every Loop|ไม่มีอะไรทำให้คุณประหลาดใจได้|Nothing can surprise you|duel=.82,int=4
`;
// ปณิธานชะตา (เหตุการณ์ในชีวิต ทุกโลก): id|ชนิด|ชื่อไทย|ชื่ออังกฤษ|เป้าไทย|เป้าอังกฤษ|ตัวตรวจ|เส้นตาย(อายุ)
//  ชนิด: sec=ลับ (บอกแค่คำใบ้) · con=ขัดกัน · imp=ถูกตั้งให้ · mut=กลายพันธุ์ · wag=เดิมพัน · (ข้ามชาติ: ทุกชนิดที่ล้มเหลวจะติดไปชาติหน้า)
window.XT_VOW=`
v01|sec|สิ่งที่ฟ้ารอให้ทำ|What Heaven Waits For|มีกรรมดี 150 ขึ้นไป|Reach karma +150|kar>=150|70
v02|sec|เสียงในความฝันบอก|The Dream Voice Says|มีชื่อเสียง 5,000 ขึ้นไป|Reach 5,000 fame|fame>=5000|60
v03|sec|เหรียญที่ตกจากฟ้า|The Coin from the Sky|มีเงิน 100,000 ขึ้นไป|Hold 100,000 money|mon>=100000|65
v04|sec|เด็กที่เจ้าจะปกป้อง|The Child You'll Protect|มีลูก 3 คนขึ้นไป|Have 3 or more children|kid>=3|60
v05|con|ไม่ฆ่าใคร|Kill No One|ไม่ชนะดวลสูสีเลยจนอายุ 50|No close-duel wins before 50|kw<=0&&age>=50|50
v06|con|ล้างแค้นให้พ่อ|Avenge Your Father|ชนะดวลสูสี 8 ครั้ง|Win 8 close duels|kw>=8|60
v07|imp|คำสั่งของพ่อแม่|Your Parents' Command|แต่งงานก่อนอายุ 30|Marry before 30|mar>=1|30
v08|imp|คำสั่งของอาจารย์|Your Master's Command|มีชื่อเสียง 2,000 ก่อนอายุ 40|Reach 2,000 fame by 40|fame>=2000|40
v09|imp|คำสาบานต่อศัตรู|An Oath to Your Enemy|มีกรรม -100 หรือต่ำกว่า|Sink karma to -100|kar<=-100|55
v10|mut|ปกป้องหมู่บ้าน|Protect the Village|กรรมดี 80 ขึ้นไป|Karma +80 or more|kar>=80|50
v11|mut|สร้างฐานะ|Build a Fortune|มีเงิน 40,000 ขึ้นไป|Hold 40,000 money|mon>=40000|45
v12|wag|เดิมพันกับฟ้า|A Wager with Heaven|มีชื่อเสียง 3,000 ก่อนอายุ 45|3,000 fame by 45|fame>=3000|45
v13|wag|เดิมพันกับยมทูต|A Wager with Death|มีชีวิตถึงอายุ 90|Live to 90|age>=90|90
v14|wag|เดิมพันกับเทพทรัพย์|A Wager with the God of Wealth|มีเงิน 150,000 ก่อนอายุ 55|150,000 money by 55|mon>=150000|55
v15|imp|คำขอของคนรัก|Your Beloved's Request|ไม่มีลูกเลยจนอายุ 45 แต่ยังแต่งงานอยู่|Stay married, childless, until 45|mar>=1&&kid<=0&&age>=45|45
v16|sec|ดาวที่ยังไม่ตก|The Star Not Yet Fallen|ชนะดวลสูสี 15 ครั้ง|Win 15 close duels|kw>=15|70
`;

try{wReady('xt_data')}catch(e){}
