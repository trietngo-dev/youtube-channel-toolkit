import {
  ItemCategory,
  SubjectCategoryInfo,
  SubjectItem,
  GemstoneItem,
  FluidItem,
  ToolItem,
  AestheticStyle,
  VideoPlatformStyle,
  GeminiModelOption,
} from "../types";

export const CATEGORIES: SubjectCategoryInfo[] = [
  {
    id: "fruit",
    nameVi: "Trái Cây Đá Quý",
    nameEn: "Gemstone Fruits",
    emoji: "🥑",
    description:
      "Trái cây nhiệt đới điêu khắc từ đá quý cao cấp với lõi tuôn trào mật ong và vàng lỏng.",
  },
  {
    id: "tech_jelly",
    nameVi: "Công Nghệ & Thạch",
    nameEn: "Cyber Jelly & Tech",
    emoji: "📱",
    description:
      "Đồ công nghệ và vật phẩm hằng ngày bằng thạch thủy tinh trong suốt phát quang vi mạch neon.",
  },
  {
    id: "cosmic_planet",
    nameVi: "Hành Tinh & Vũ Trụ",
    nameEn: "Cosmic Spheres",
    emoji: "🪐",
    description:
      "Bổ đôi Trái Đất, Sao Thổ, Mặt Trăng mini chứa lõi dung nham rực lửa và sữa ngân hà xoáy.",
  },
  {
    id: "illusion_cake",
    nameVi: "Ảo Ảnh Bánh & Sáp",
    nameEn: "Illusion Cakes & Wax",
    emoji: "🍰",
    description:
      "Nhìn như thỏi vàng, gạch đá xù xì nhưng cắt êm ru như bơ mềm lộ cốt bánh kem nhung phát sáng.",
  },
  {
    id: "dragon_egg",
    nameVi: "Trứng Rồng & Geode",
    nameEn: "Dragon Eggs & Geode",
    emoji: "🐉",
    description:
      "Trứng sinh vật huyền bí có vảy bạc, tổ ong hổ phách vàng tràn ra tinh chất phát quang.",
  },
  {
    id: "ocean_crystal",
    nameVi: "Đại Dương Pha Lê",
    nameEn: "Crystal Marine Shells",
    emoji: "🌊",
    description:
      "Vỏ ốc Nautilus xà cừ, sao biển thủy tinh chứa bọt sóng đại dương và ngọc trai phát sáng.",
  },
];

export const FRUITS: SubjectItem[] = [
  // ==========================================
  // 1. CATEGORY: FRUIT (Trái Cây Đá Quý) - 12 MẪU
  // ==========================================
  {
    id: "avocado",
    category: "fruit",
    nameVi: "Quả Bơ Ngọc Lục Bảo",
    nameEn: "Emerald Avocado",
    emoji: "🥑",
    colorHex: "#568203",
    typicalStructure:
      "Vỏ đá sần sùi sẫm màu, thịt quả ngọc lục bảo bóng bẩy, hạt tròn hổ phách vàng ở giữa.",
    textureDescription:
      "Dark textured crystalline stone skin, translucent glowing emerald green flesh, cracked amber golden core",
  },
  {
    id: "dragonfruit",
    category: "fruit",
    nameVi: "Thanh Long Thạch Anh Tím",
    nameEn: "Amethyst Dragonfruit",
    emoji: "🐉",
    colorHex: "#ff1493",
    typicalStructure:
      "Vỏ gai uốn lượn màu hồng ngọc, bên trong ruột thạch anh tím đính hạt obsidian lấp lánh.",
    textureDescription:
      "Exotic gemstone petal exterior, deep magenta or amethyst crystal core dotted with obsidian seeds",
  },
  {
    id: "strawberry",
    category: "fruit",
    nameVi: "Dâu Tây Ruby Tinh Thể",
    nameEn: "Faceted Ruby Strawberry",
    emoji: "🍓",
    colorHex: "#ff0033",
    typicalStructure:
      "Bề mặt ruby đỏ thẫm đính các hạt kim cương vàng óng, đài hoa ngọc bích trên đỉnh.",
    textureDescription:
      "Porous faceted ruby crystal with glittering micro-diamond seeds and emerald crystal calyx",
  },
  {
    id: "watermelon",
    category: "fruit",
    nameVi: "Dưa Hấu Pha Lê Đỏ",
    nameEn: "Crystal Watermelon",
    emoji: "🍉",
    colorHex: "#ff3366",
    typicalStructure:
      "Vỏ xanh ngọc kẻ sọc, thịt quả đỏ rực với các hạt lấp lánh như kim cương đen, mọng nước.",
    textureDescription:
      "Crisp crystal geometric lattice with glassy seeds embedded in translucent red pulp",
  },
  {
    id: "pomegranate",
    category: "fruit",
    nameVi: "Quả Lựu Ngọc Garnet",
    nameEn: "Garnet Jewel Pomegranate",
    emoji: "🫐",
    colorHex: "#e60049",
    typicalStructure:
      "Hàng trăm tép lựu hình viên đá ruby faceted nhiều mặt cắt, xếp chặt khít, khi cắt vỡ dịch đỏ bắn nhẹ.",
    textureDescription:
      "Clusters of tightly packed faceted gemstone arils, glassy transparent jewel seeds",
  },
  {
    id: "orange",
    category: "fruit",
    nameVi: "Quả Cam Hổ Phách",
    nameEn: "Amber Citrus Orange",
    emoji: "🍊",
    colorHex: "#ff7700",
    typicalStructure:
      "Các múi cam dạng tinh thể hổ phách, túi tép ngậm nước căng mọng trong suốt xếp hình nan hoa.",
    textureDescription:
      "Segmented translucent amber pulp capsules, glowing citrus vesicles filled with liquid light",
  },
  {
    id: "kiwi",
    category: "fruit",
    nameVi: "Quả Kiwi Ngọc Peridot",
    nameEn: "Peridot Sunburst Kiwi",
    emoji: "🥝",
    colorHex: "#8ee53f",
    typicalStructure:
      "Vỏ thô ráp như đá mã não nâu, thịt quả peridot xanh nõn chuối tỏa tia với vòng hạt đen quanh tâm.",
    textureDescription:
      "Frosted agate stone skin revealing bright translucent peridot crystal core with radial seed ring",
  },
  {
    id: "grapes",
    category: "fruit",
    nameVi: "Chùm Nho Thạch Anh Tím",
    nameEn: "Amethyst Crystal Grapes",
    emoji: "🍇",
    colorHex: "#6f2da8",
    typicalStructure:
      "Chùm ngọc thạch anh tím tròn căng mọng, phản chiếu ánh sáng thủy tinh huyền ảo.",
    textureDescription:
      "Cluster of spherical polished amethyst spheres with liquid dew droplets and frosted crystal bloom",
  },
  {
    id: "peach",
    category: "fruit",
    nameVi: "Quả Đào Tiên Thạch Anh Hồng",
    nameEn: "Rose Quartz Peach",
    emoji: "🍑",
    colorHex: "#ff9999",
    typicalStructure:
      "Vỏ thạch anh hồng mịn màng chuyển sắc ombre cam đào, hạt gỗ hóa thạch ở giữa.",
    textureDescription:
      "Velvety rose quartz crystal surface with soft sunset gradient and fossilized opal seed core",
  },
  {
    id: "mango",
    category: "fruit",
    nameVi: "Quả Xoài Cát Hoàng Ngọc",
    nameEn: "Imperial Topaz Mango",
    emoji: "🥭",
    colorHex: "#ffcc00",
    typicalStructure:
      "Thịt xoài bằng đá hoàng ngọc Topaz vàng ươm, mềm mịn mướt mát, hạt dẹt phát quang.",
    textureDescription:
      "Luminescent imperial topaz crystal flesh, ultra-glossy succulent yellow gemstone texture",
  },
  {
    id: "pineapple",
    category: "fruit",
    nameVi: "Quả Dứa Thạch Anh Vàng",
    nameEn: "Golden Citrine Pineapple",
    emoji: "🍍",
    colorHex: "#f59e0b",
    typicalStructure:
      "Mắt dứa hình thoi kim cương đa giác vàng rực, chùm lá đỉnh đầu bằng ngọc lục bảo sắc nhọn.",
    textureDescription:
      "Geometric diamond-faceted golden citrine scales with sharp emerald crystal leaves and glowing quartz core",
  },
  {
    id: "coconut",
    category: "fruit",
    nameVi: "Quả Dừa Thạch Cao & Opal",
    nameEn: "Milky Opal Geode Coconut",
    emoji: "🥥",
    colorHex: "#f1f5f9",
    typicalStructure:
      "Gáo đá mã não thô cứng bên ngoài, bên trong là lớp cùi thạch cao opal trắng và nước dừa kim cương.",
    textureDescription:
      "Rough geode agate shell cracking open to reveal pristine milky white opal flesh and clear liquid diamond water",
  },

  // ==========================================
  // 2. CATEGORY: TECH_JELLY (Đồ Công Nghệ & Thạch Neon) - 10 MẪU
  // ==========================================
  {
    id: "jelly_iphone",
    category: "tech_jelly",
    nameVi: "iPhone Thạch Neon",
    nameEn: "Jelly Cyber iPhone",
    emoji: "📱",
    colorHex: "#00f0ff",
    typicalStructure:
      "Toàn bộ thân máy bằng thạch thủy tinh trong suốt siêu bóng, vi mạch bên trong phát sáng neon cyan.",
    textureDescription:
      "Hyper-glossy transparent jelly smartphone, visible glowing neon cyan holographic motherboard circuits inside",
  },
  {
    id: "jelly_dualsense",
    category: "tech_jelly",
    nameVi: "Tay Cầm PS5 Thạch Tím",
    nameEn: "Jelly Gaming Controller",
    emoji: "🎮",
    colorHex: "#9d00ff",
    typicalStructure:
      "Thân tay cầm game bằng cao su dẻo mềm óng ánh, nút bấm pha lê, bên trong tuôn ra dòng điện lỏng.",
    textureDescription:
      "Translucent squishy purple silicone gaming controller with crystal buttons and glowing liquid electrical fluid",
  },
  {
    id: "glass_sneaker",
    category: "tech_jelly",
    nameVi: "Giày Sneaker Thủy Tinh Xà Cừ",
    nameEn: "Crystal Nike Sneaker",
    emoji: "👟",
    colorHex: "#ff007f",
    typicalStructure:
      "Thân giày điêu khắc từ thủy tinh xà cừ óng ánh 7 màu, đế khí đệm chứa bọt ngọc trai cầu vồng.",
    textureDescription:
      "Faceted iridescent glass sneaker sculpture with air bubble cushion sole filled with liquid rainbow pearls",
  },
  {
    id: "vintage_camera",
    category: "tech_jelly",
    nameVi: "Máy Ảnh Cổ Điển Pha Lê",
    nameEn: "Crystal Retro Camera",
    emoji: "📷",
    colorHex: "#e5e7eb",
    typicalStructure:
      "Thân máy bằng đá mã não đen bóng bẩy, ống kính bằng pha lê Swarovski, cuộn phim bằng mật ong vàng.",
    textureDescription:
      "Polished black obsidian camera body with Swarovski crystal lens and glowing liquid honey film cartridge core",
  },
  {
    id: "crystal_airpods",
    category: "tech_jelly",
    nameVi: "Tai Nghe AirPods Pha Lê Thạch Anh",
    nameEn: "Quartz Crystal Earbuds",
    emoji: "🎧",
    colorHex: "#ffffff",
    typicalStructure:
      "Hộp sạc và tai nghe bằng thạch anh trắng trong suốt, màng loa phát ra các hạt sóng âm dạ quang.",
    textureDescription:
      "Pure transparent quartz crystal wireless earbuds and charging case with pulsing glowing soundwave particles",
  },
  {
    id: "cyber_gpu",
    category: "tech_jelly",
    nameVi: "Card Màn Hình RTX Cyber Thủy Tinh",
    nameEn: "Crystal RTX Cyber GPU",
    emoji: "💻",
    colorHex: "#10b981",
    typicalStructure:
      "Khối card đồ họa bằng thủy tinh trong suốt, ống tản nhiệt đồng phát sáng, cánh quạt pha lê xoay chậm.",
    textureDescription:
      "Transparent tempered glass GPU card with glowing neon green liquid cooling tubes and crystal fan blades",
  },
  {
    id: "smartwatch_opal",
    category: "tech_jelly",
    nameVi: "Đồng Hồ Thông Minh Xà Cừ",
    nameEn: "Opal Glass Smartwatch",
    emoji: "⌚",
    colorHex: "#06b6d4",
    typicalStructure:
      "Mặt đồng hồ tròn xà cừ phát quang giao diện số neon, dây đeo thạch dẻo mềm óng ánh tia sáng.",
    textureDescription:
      "Iridescent opal glass smartwatch with holographic neon UI display and squishy glowing silicone strap",
  },
  {
    id: "neon_cassette",
    category: "tech_jelly",
    nameVi: "Băng Cassette Retro Thạch Lam",
    nameEn: "Neon Jelly Retro Cassette",
    emoji: "📼",
    colorHex: "#ec4899",
    typicalStructure:
      "Vỏ băng cassette trong suốt màu hồng tím synthwave, cuộn băng từ bằng sợi dạ quang phát sáng.",
    textureDescription:
      "Translucent hot-pink synthwave cassette tape with glowing magnetic ribbon coils and liquid audio particles",
  },
  {
    id: "mechanical_keyboard_key",
    category: "tech_jelly",
    nameVi: "Phím Bàn Phím Cơ Pha Lê",
    nameEn: "Crystal Keycap & Switch",
    emoji: "⌨️",
    colorHex: "#8b5cf6",
    typicalStructure:
      "Nút phím artisan pha lê nhiều tầng, switch bên trong trong suốt phát ra ánh sáng RGB rực rỡ.",
    textureDescription:
      "Artisan clear crystal mechanical keycap with glowing neon RGB switch mechanism and soundwave droplets",
  },
  {
    id: "cyber_energy_drink",
    category: "tech_jelly",
    nameVi: "Lon Nước Tăng Lực Thạch Plasma",
    nameEn: "Plasma Energy Can",
    emoji: "🥤",
    colorHex: "#eab308",
    typicalStructure:
      "Vỏ lon bằng thạch thủy tinh trong vắt in logo neon, bên trong là dung dịch plasma sủi bọt tia sét.",
    textureDescription:
      "Hyper-clear jelly soda can containing glowing electric yellow plasma fluid and sparking micro-lightning bubbles",
  },

  // ==========================================
  // 3. CATEGORY: COSMIC_PLANET (Hành Tinh & Vũ Trụ Mini) - 10 MẪU
  // ==========================================
  {
    id: "mini_earth",
    category: "cosmic_planet",
    nameVi: "Quả Cầu Trái Đất Mini",
    nameEn: "Miniature Earth Sphere",
    emoji: "🌍",
    colorHex: "#0077be",
    typicalStructure:
      "Đại dương bằng đá Sapphire xanh biếc, lục địa ngọc bích, bên trong lõi là dung nham vàng rực lửa.",
    textureDescription:
      "Lapis lazuli and sapphire ocean orb with emerald continents, containing a molten magma golden core",
  },
  {
    id: "saturn_rings",
    category: "cosmic_planet",
    nameVi: "Sao Thổ & Vành Đai Kim Cương",
    nameEn: "Saturn with Diamond Rings",
    emoji: "🪐",
    colorHex: "#e3bb7b",
    typicalStructure:
      "Quả cầu hổ phách xoáy dải mây khí quyển, vành đai nhẫn kim cương bay quanh, ruột chứa mưa sao băng.",
    textureDescription:
      "Golden amber gas giant sphere encircled by floating micro-diamond rings, glowing cosmic nebular center",
  },
  {
    id: "moonstone_moon",
    category: "cosmic_planet",
    nameVi: "Mặt Trăng Đá Mặt Trăng",
    nameEn: "Moonstone Lunar Orb",
    emoji: "🌕",
    colorHex: "#f0f3f4",
    typicalStructure:
      "Bề mặt miệng núi lửa bằng đá Moonstone phát sáng huyền ảo, khi bổ đôi tràn ra sữa thiên hà ngũ sắc.",
    textureDescription:
      "Cratered translucent moonstone sphere with ethereal blue adularescence sheen and galaxy milk core",
  },
  {
    id: "molten_mars",
    category: "cosmic_planet",
    nameVi: "Sao Hỏa Dung Nham Đỏ",
    nameEn: "Molten Mars Sphere",
    emoji: "🔴",
    colorHex: "#cc3300",
    typicalStructure:
      "Vỏ đá Carnelian đỏ rực sần sùi, cắt đôi giải phóng dòng dung nham magma sôi sùng sục phát sáng.",
    textureDescription:
      "Textured red carnelian planetary sphere with glowing fissures, releasing bubbling molten volcanic magma",
  },
  {
    id: "black_hole_orb",
    category: "cosmic_planet",
    nameVi: "Quả Cầu Lỗ Đen Tinh Vân",
    nameEn: "Mini Black Hole Nebula Orb",
    emoji: "🌌",
    colorHex: "#0b001a",
    typicalStructure:
      "Quả cầu hắc diện thạch hút ánh sáng, đĩa bồi tụ phát quang xoay quanh, bên trong là dòng chảy không-thời gian.",
    textureDescription:
      "Ultra-dense obsidian singularity sphere surrounded by glowing purple accretion disk and swirling starry void",
  },
  {
    id: "jupiter_great_red_spot",
    category: "cosmic_planet",
    nameVi: "Sao Mộc & Bão Đỏ Khổng Lồ",
    nameEn: "Jupiter Great Red Spot Orb",
    emoji: "🟤",
    colorHex: "#d97706",
    typicalStructure:
      "Dải mây khí quyển đá cẩm thạch xoáy tầng, mắt bão đỏ ruby khổng lồ xoay tít quanh tâm lõi hydro lỏng.",
    textureDescription:
      "Swirling marble storm bands of ochre and cream, crimson ruby storm eye, liquid metallic hydrogen core",
  },
  {
    id: "sun_plasma_orb",
    category: "cosmic_planet",
    nameVi: "Mặt Trời Plasma Rực Lửa",
    nameEn: "Mini Blazing Plasma Sun",
    emoji: "☀️",
    colorHex: "#ef4444",
    typicalStructure:
      "Quả cầu plasma năng lượng hạt nhân phát sáng chói lọi, các tai lửa vươn dài, ruột là ánh sáng trắng tinh khiết.",
    textureDescription:
      "Blazing nuclear fusion plasma sphere with looping solar flares, releasing blinding golden corona rays",
  },
  {
    id: "neptune_deep_ice",
    category: "cosmic_planet",
    nameVi: "Sao Hải Vương Băng Xanh Thẳm",
    nameEn: "Neptune Deep Azure Ice Orb",
    emoji: "🔵",
    colorHex: "#3b82f6",
    typicalStructure:
      "Bề mặt đá lam ngọc sâu thẳm lộng gió, bên trong chứa đại dương băng methan siêu nén lấp lánh.",
    textureDescription:
      "Deep cobalt blue icy sphere with supersonic white cloud streaks, releasing superionic water diamond slush",
  },
  {
    id: "meteorite_geode",
    category: "cosmic_planet",
    nameVi: "Thiên Thạch Vũ Trụ Rơi",
    nameEn: "Cosmic Chondrite Meteorite",
    emoji: "☄️",
    colorHex: "#71717a",
    typicalStructure:
      "Vỏ cháy đen thiên thạch với vết trũng ngón tay bốc khói, bổ đôi lộ hang tinh thể đá ngoài hành tinh.",
    textureDescription:
      "Charred fusion-crusted stony meteorite splitting open to reveal glowing extraterrestrial peridot crystals inside",
  },
  {
    id: "pulsar_star_sphere",
    category: "cosmic_planet",
    nameVi: "Ngôi Sao Neutron Pulsar",
    nameEn: "Spinning Pulsar Neutron Star",
    emoji: "💫",
    colorHex: "#a855f7",
    typicalStructure:
      "Quả cầu siêu đặc phát ra hai chùm tia bức xạ tím ở hai cực, từ trường xoáy phát quang bao quanh.",
    textureDescription:
      "Ultra-dense glowing violet pulsar star emitting twin laser-like polar radiation beams and magnetic waves",
  },

  // ==========================================
  // 4. CATEGORY: ILLUSION_CAKE (Ảo Ảnh Bánh Ngọt & Vật Thể Siêu Mềm) - 10 MẪU
  // ==========================================
  {
    id: "gold_ingot_cake",
    category: "illusion_cake",
    nameVi: "Thỏi Vàng Đúc 9999 (Ảo Ảnh Bánh)",
    nameEn: "Pure Gold Ingot Illusion Cake",
    emoji: "🧈",
    colorHex: "#ffd700",
    typicalStructure:
      "Bên ngoài là thỏi vàng nguyên khối sáng lóa, cắt vào lún êm ru lộ cốt bánh mousse sô-cô-la và sốt caramel.",
    textureDescription:
      "Mirror-polished 9999 gold bar exterior cleanly sliced to reveal decadent dark chocolate mousse and oozing salted caramel",
  },
  {
    id: "red_brick_cake",
    category: "illusion_cake",
    nameVi: "Viên Gạch Xây Dựng Xù Xì",
    nameEn: "Rough Brick Velvet Cake",
    emoji: "🧱",
    colorHex: "#b22222",
    typicalStructure:
      "Vỏ gạch nung thô nhám chân thực, khi dao chạm vào cắt ngọt lịm lộ cốt bánh Red Velvet nhung mềm mịn.",
    textureDescription:
      "Hyper-realistic rough clay construction brick sliced open to reveal moist red velvet sponge and white cream cheese",
  },
  {
    id: "agarwood_log",
    category: "illusion_cake",
    nameVi: "Khối Gỗ Trầm Hương Thô",
    nameEn: "Rustic Wood Log Illusion Cake",
    emoji: "🪵",
    colorHex: "#5c4033",
    typicalStructure:
      "Vỏ vân gỗ sần sùi rêu phong, cắt đôi lộ các lớp thạch matcha xanh mướt và mật ong hổ phách tuôn trào.",
    textureDescription:
      "Realistic rough tree bark exterior cleanly cut to reveal layered matcha gelee and cascading amber honey sap",
  },
  {
    id: "marble_soap_ribbon",
    category: "illusion_cake",
    nameVi: "Khối Xà Phòng Cẩm Thạch Siêu Mịn",
    nameEn: "Marble Soap Kinetic Ribbon",
    emoji: "🧼",
    colorHex: "#e0ffff",
    typicalStructure:
      "Khối xà phòng vân cẩm thạch trắng lam bóng mượt, khi lưỡi dao lướt qua cuộn thành từng dải ruy-băng sáp phát sáng.",
    textureDescription:
      "Silky smooth pastel marble kinetic soap block shaving off into glowing ribbons and satisfying wax curls",
  },
  {
    id: "concrete_cinder_block",
    category: "illusion_cake",
    nameVi: "Cục Bê Tông Xây Dựng Xám",
    nameEn: "Concrete Block Illusion Cake",
    emoji: "🏗️",
    colorHex: "#94a3b8",
    typicalStructure:
      "Vỏ bê tông xám nhám lỗ chỗ bọt khí, cắt vào êm ru lộ cốt bánh Cookies & Cream và kem vani béo ngậy.",
    textureDescription:
      "Porous rough grey concrete cinder block cleanly bisected to reveal layers of black cocoa sponge and vanilla buttercream",
  },
  {
    id: "giant_eraser",
    category: "illusion_cake",
    nameVi: "Cục Tẩy Bút Chì Khổng Lồ",
    nameEn: "Giant Pink Eraser Illusion Cake",
    emoji: "✏️",
    colorHex: "#f472b6",
    typicalStructure:
      "Bề mặt cao su màu hồng lì hoàn hảo, cắt đôi ngọt lịm để lộ cốt bánh chiffon dâu tây và sốt dâu đỏ tươi.",
    textureDescription:
      "Matte pink rubber eraser sliced with buttery ease to reveal fluffy strawberry chiffon cake and ruby strawberry jam",
  },
  {
    id: "rusty_wrench_cake",
    category: "illusion_cake",
    nameVi: "Cờ Lê Rỉ Sét Cổ Điển",
    nameEn: "Vintage Rusty Wrench Illusion Cake",
    emoji: "🔧",
    colorHex: "#78350f",
    typicalStructure:
      "Vỏ kim loại phủ lớp rỉ sét màu nâu đỏ chân thực, cắt ngang lộ kẹo praline hạt phỉ và ganache cà phê.",
    textureDescription:
      "Heavily rusted cast iron wrench cleanly sliced open to reveal crunchy hazelnut praline and dark espresso ganache",
  },
  {
    id: "leather_book_cake",
    category: "illusion_cake",
    nameVi: "Cuốn Sách Cổ Bìa Da",
    nameEn: "Ancient Leather Book Cake",
    emoji: "📖",
    colorHex: "#854d0e",
    typicalStructure:
      "Bìa da dập nổi hoa văn mạ vàng cổ kính, các trang sách là hàng chục lớp bánh crepe ngàn lớp mỏng tang.",
    textureDescription:
      "Embossed antique leather book cover sliced open showing paper-thin golden mille-crepe cake layers with vanilla cream",
  },
  {
    id: "kinetic_sand_castle",
    category: "illusion_cake",
    nameVi: "Lâu Đài Cát Động Lực",
    nameEn: "Kinetic Sand Castle Slicing",
    emoji: "🏰",
    colorHex: "#fde047",
    typicalStructure:
      "Tòa lâu đài cát động lực có góc cạnh sắc nét, khi lưỡi dao cắt qua từng tầng cát sụp đổ mịn màng như sóng nước.",
    textureDescription:
      "Crisp geometric kinetic sand castle collapsing into ultra-smooth flowing micro-sand ribbons under blade pressure",
  },
  {
    id: "sponge_coral_block",
    category: "illusion_cake",
    nameVi: "Miếng Bọt Biển Rửa Bát Siêu Mềm",
    nameEn: "Kitchen Sponge Illusion Cake",
    emoji: "🧽",
    colorHex: "#84cc16",
    typicalStructure:
      "Tầng trên xanh lá nhám, tầng dưới vàng xốp lỗ chỗ chân thực, cắt êm ru lộ bánh chiffon chanh vàng thanh mát.",
    textureDescription:
      "Hyper-realistic dual-layer yellow and green kitchen sponge sliced into airy lemon chiffon cake and citrus curd",
  },

  // ==========================================
  // 5. CATEGORY: DRAGON_EGG (Trứng Rồng & Hóa Thạch Kỳ Bí) - 10 MẪU
  // ==========================================
  {
    id: "frost_dragon_egg",
    category: "dragon_egg",
    nameVi: "Trứng Rồng Băng Tuyết",
    nameEn: "Frost Dragon Crystal Egg",
    emoji: "🥚",
    colorHex: "#a0e6ff",
    typicalStructure:
      "Vỏ vảy rồng bằng pha lê băng lấp lánh sương tuyết, cắt đôi tỏa khói lạnh và dung dịch tinh thể lam ngọc.",
    textureDescription:
      "Faceted ice crystal dragon scales with frost mist, cleanly split to release glowing cryogenic cyan liquid and sapphire core",
  },
  {
    id: "inferno_dragon_egg",
    category: "dragon_egg",
    nameVi: "Trứng Rồng Hỏa Diệm",
    nameEn: "Inferno Magma Dragon Egg",
    emoji: "🔥",
    colorHex: "#ff4500",
    typicalStructure:
      "Vảy rồng đá bazan đen với các khe nứt rực lửa, bên trong chứa lòng đỏ vàng lỏng tỏa nhiệt rực rỡ.",
    textureDescription:
      "Black basalt volcanic dragon egg with glowing lava veins, splitting open to release liquid molten gold yolk",
  },
  {
    id: "citrine_honeycomb",
    category: "dragon_egg",
    nameVi: "Tổ Ong Thạch Anh Vàng",
    nameEn: "Citrine Crystal Honeycomb",
    emoji: "🍯",
    colorHex: "#e5a50a",
    typicalStructure:
      "Từng ô lục giác tổ ong bằng đá thạch anh vàng trong vắt, tràn ngập mật ong chúa và phấn hoa lấp lánh.",
    textureDescription:
      "Geometric translucent citrine gemstone honeycomb grid overflowing with thick glowing royal jelly honey",
  },
  {
    id: "fossil_amber_geode",
    category: "dragon_egg",
    nameVi: "Hóa Thạch Hổ Phách Tiền Sử",
    nameEn: "Prehistoric Fossil Amber Geode",
    emoji: "🦖",
    colorHex: "#d97706",
    typicalStructure:
      "Khối đá cổ sinh vật xù xì, bổ đôi lộ viên hổ phách vàng óng ả bảo tồn lông vũ phát quang sinh học.",
    textureDescription:
      "Rough ancient stone fossil splitting to reveal pristine golden amber interior with luminescent prehistoric inclusions",
  },
  {
    id: "thunder_dragon_egg",
    category: "dragon_egg",
    nameVi: "Trứng Rồng Sấm Sét",
    nameEn: "Storm Thunder Dragon Egg",
    emoji: "⚡",
    colorHex: "#38bdf8",
    typicalStructure:
      "Vảy rồng titanium ánh kim xanh điện, khi tách đôi phóng ra các tia chớp plasma và luồng khí ion hóa.",
    textureDescription:
      "Iridescent blue titanium dragon scales releasing high-voltage electrical plasma sparks and glowing ball lightning",
  },
  {
    id: "emerald_forest_egg",
    category: "dragon_egg",
    nameVi: "Trứng Rồng Rừng Cổ Đại",
    nameEn: "Ancient Forest Dragon Egg",
    emoji: "🌿",
    colorHex: "#15803d",
    typicalStructure:
      "Vỏ đá mã não rêu xanh cổ thụ cuốn rễ cây phát quang, bổ đôi tràn ra nhựa sống ngọc lục bảo tinh khiết.",
    textureDescription:
      "Moss agate crystalline egg wrapped in luminescent tree roots, releasing viscous glowing emerald life sap",
  },
  {
    id: "shadow_wyrm_egg",
    category: "dragon_egg",
    nameVi: "Trứng Rồng Bóng Đêm Hắc Ám",
    nameEn: "Shadow Wyrm Obsidian Egg",
    emoji: "🖤",
    colorHex: "#18181b",
    typicalStructure:
      "Vỏ đá hắc diện thạch đen tuyền phản chiếu 7 màu, khi cắt đôi giải phóng làn sương khói tím huyền bí.",
    textureDescription:
      "Mirror-finish black obsidian scales splitting open to release dense swirling violet shadow mist and dark matter orb",
  },
  {
    id: "amethyst_geode_egg",
    category: "dragon_egg",
    nameVi: "Trứng Thạch Nhũ Thạch Anh Tím",
    nameEn: "Amethyst Stalactite Geode Egg",
    emoji: "🔮",
    colorHex: "#7e22ce",
    typicalStructure:
      "Vỏ thô đá hoa cương xám, bên trong rỗng ruột chứa hang động thạch nhũ tím sắc nhọn đọng giọt sương mai.",
    textureDescription:
      "Rough grey granite egg cracking open to reveal a glittering cavern of sharp purple amethyst crystal stalactites",
  },
  {
    id: "phoenix_flame_egg",
    category: "dragon_egg",
    nameVi: "Trứng Phượng Hoàng Lửa",
    nameEn: "Phoenix Solar Flame Egg",
    emoji: "🪶",
    colorHex: "#ea580c",
    typicalStructure:
      "Vỏ vảy lông vũ vàng đỏ đúc từ ruby và topaz, khi cắt đôi bùng cháy nhẹ nhàng tỏa ra giọt tiên dược trường sinh.",
    textureDescription:
      "Golden feathered crystal egg pulsing with warm incandescent fire, releasing liquid sunburst elixir droplets",
  },
  {
    id: "megalodon_tooth_fossil",
    category: "dragon_egg",
    nameVi: "Hóa Thạch Răng Cá Mập Khổng Lồ",
    nameEn: "Megalodon Tooth Opalized Fossil",
    emoji: "🦈",
    colorHex: "#475569",
    typicalStructure:
      "Răng cá mập tiền sử hóa thạch xám khói có răng cưa sắc bén, bên trong lõi hóa thành ngọc mắt mèo Opal 7 màu.",
    textureDescription:
      "Serrated petrified shark tooth cleanly sectioned to expose dazzling multi-color precious opal crystalline core",
  },

  // ==========================================
  // 6. CATEGORY: OCEAN_CRYSTAL (Đại Dương Pha Lê & Vỏ Sò) - 10 MẪU
  // ==========================================
  {
    id: "nautilus_shell",
    category: "ocean_crystal",
    nameVi: "Vỏ Ốc Anh Vũ Pha Lê",
    nameEn: "Crystal Nautilus Shell",
    emoji: "🐚",
    colorHex: "#fef3c7",
    typicalStructure:
      "Vỏ xoắn ốc tỷ lệ vàng bằng xà cừ óng ánh, cắt dọc lộ từng khoang chứa bọt sóng biển xanh biếc.",
    textureDescription:
      "Iridescent mother-of-pearl spiral shell with golden ratio chambers holding bioluminescent ocean waves",
  },
  {
    id: "crystal_starfish",
    category: "ocean_crystal",
    nameVi: "Sao Biển Thủy Tinh Dạ Quang",
    nameEn: "Bioluminescent Glass Starfish",
    emoji: "⭐",
    colorHex: "#06b6d4",
    typicalStructure:
      "Thân sao biển bằng thủy tinh ngọc lam đính hạt cát vàng, bổ đôi tuôn ra gel sinh học phát sáng rực rỡ.",
    textureDescription:
      "Translucent aquamarine glass sea star with micro-pearl texture, releasing glowing cyan oceanic gel",
  },
  {
    id: "giant_clam_pearl",
    category: "ocean_crystal",
    nameVi: "Vỏ Sò Khổng Lồ & Ngọc Trai Đen",
    nameEn: "Giant Crystal Clam & Black Pearl",
    emoji: "🦪",
    colorHex: "#1e293b",
    typicalStructure:
      "Vỏ sò đá cẩm thạch lam sâu thẳm, cắt đôi hé lộ viên ngọc trai đen Tahiti khổng lồ tỏa ánh hào quang.",
    textureDescription:
      "Carved deep ocean marble clam shell cleanly sliced to reveal massive glowing Tahiti black pearl center",
  },
  {
    id: "glass_jellyfish",
    category: "ocean_crystal",
    nameVi: "Con Sứa Thủy Tinh Trong Suốt",
    nameEn: "Crystal Bioluminescent Jellyfish",
    emoji: "🪼",
    colorHex: "#c084fc",
    typicalStructure:
      "Vòm dù sứa bằng thủy tinh borosilicate siêu mỏng phát quang, xúc tu dạ quang tuôn mật biển phát sáng.",
    textureDescription:
      "Ultra-delicate blown glass jellyfish bell with trailing neon lilac tentacles releasing luminous deep-sea nectar",
  },
  {
    id: "conch_shell_geode",
    category: "ocean_crystal",
    nameVi: "Vỏ Ốc Biển Hoàng Gia",
    nameEn: "Imperial Pink Conch Shell",
    emoji: "🐌",
    colorHex: "#fda4af",
    typicalStructure:
      "Miệng ốc màu hồng ngọc trai mịn màng, lòng ốc chứa tinh thể thạch anh hồng và giọt nước biển khúc xạ nắng vàng.",
    textureDescription:
      "Glossy porcelain pink conch shell interior lined with sparkling rose quartz druzy and sunlit water droplets",
  },
  {
    id: "coral_reef_geode",
    category: "ocean_crystal",
    nameVi: "Rạn San Hô Thạch Anh Đỏ",
    nameEn: "Red Quartz Coral Reef Geode",
    emoji: "🪸",
    colorHex: "#f43f5e",
    typicalStructure:
      "Các nhánh san hô đỏ hình cây điêu khắc từ ruby, giữa các kẽ hở là phù du phát quang sinh học bồng bềnh.",
    textureDescription:
      "Branching crimson quartz coral structure cleanly divided to reveal glowing cyan plankton mist and sea foam",
  },
  {
    id: "crystal_seahorse",
    category: "ocean_crystal",
    nameVi: "Cá Ngựa Pha Lê Hổ Phách",
    nameEn: "Amber Crystal Seahorse",
    emoji: "🌊",
    colorHex: "#d97706",
    typicalStructure:
      "Bộ giáp cá ngựa bằng đá hổ phách vàng chạm khắc tinh xảo, đuôi uốn lượn, bụng chứa viên ngọc sáng rực.",
    textureDescription:
      "Carved golden amber seahorse armor with tiny faceted scales, holding a radiant glowing pearl orb in its chest",
  },
  {
    id: "sea_urchin_gem",
    category: "ocean_crystal",
    nameVi: "Nhím Biển Gai Pha Lê Tím",
    nameEn: "Amethyst Spine Sea Urchin",
    emoji: "🦔",
    colorHex: "#9333ea",
    typicalStructure:
      "Vỏ cầu tròn đối xứng đính hàng trăm gai nhọn bằng thạch anh tím, bổ đôi lộ lớp trứng nhím vàng kem béo ngậy.",
    textureDescription:
      "Spherical sea urchin with radiating amethyst crystal needles cleanly halved to reveal rich golden uni coral cream",
  },
  {
    id: "crystal_sea_turtle_shell",
    category: "ocean_crystal",
    nameVi: "Mai Rùa Biển Ngọc Lam & Jade",
    nameEn: "Turquoise & Jade Sea Turtle Shell",
    emoji: "🐢",
    colorHex: "#0d9488",
    typicalStructure:
      "Các mai lục giác điêu khắc từ đá ngọc bích Jade và ngọc lam Turquoise, mép mai lấp lánh bọt sóng biển bạc.",
    textureDescription:
      "Faceted jade and turquoise hexagonal turtle carapace sliced open to reveal trapped swirling oceanic waves and silver foam",
  },
  {
    id: "sea_glass_pebble",
    category: "ocean_crystal",
    nameVi: "Viên Thủy Tinh Biển Mài Mịn",
    nameEn: "Frosted Sea Glass Geode",
    emoji: "💎",
    colorHex: "#67e8f9",
    typicalStructure:
      "Viên sỏi thủy tinh biển màu xanh bạc hà mờ sương, cắt đôi để lộ lõi pha lê bóng loáng phản chiếu ánh mặt trời.",
    textureDescription:
      "Tumbled frosted mint sea glass pebble bisected to expose crystal-clear high-gloss interior with sun caustic ripples",
  },
];

// ==========================================
// 2. MATERIALS / EXTERIOR SHELL BY CATEGORY
// ==========================================
export const MATERIALS_BY_CATEGORY: Record<ItemCategory, GemstoneItem[]> = {
  fruit: [
    {
      id: "ruby",
      nameVi: "Hồng Ngọc (Ruby)",
      nameEn: "Pigeon Blood Ruby",
      colorHex: "#e01e37",
      opticalProperty:
        "Vivid deep red with inner fiery fluorescence, vitreous luster, brilliant light refractions",
      clarity:
        "Flawless VVS crystal clarity with glowing crimson embers inside",
    },
    {
      id: "sapphire_blue",
      nameVi: "Lam Ngọc Xanh (Blue Sapphire)",
      nameEn: "Royal Blue Sapphire",
      colorHex: "#0077b6",
      opticalProperty:
        "Deep velvety royal blue, razor-sharp internal light rays, electric blue chromatic dispersion",
      clarity: "Pure crystalline transparency with deep oceanic brilliance",
    },
    {
      id: "emerald",
      nameVi: "Ngọc Lục Bảo (Emerald)",
      nameEn: "Colombian Emerald",
      colorHex: "#10b981",
      opticalProperty:
        "Lush vivid forest green with glowing internal jardin patterns, rich subsurface scattering",
      clarity: "Intense green luminescence with silky crystalline refractions",
    },
    {
      id: "amethyst",
      nameVi: "Thạch Anh Tím (Amethyst)",
      nameEn: "Deep Purple Amethyst",
      colorHex: "#9d4edd",
      opticalProperty:
        "Gradient purple to violet, sharp geometric hexagonal crystal facets, mystic glow",
      clarity:
        "Transparent purple crystal with shimmering ultraviolet highlights",
    },
    {
      id: "rainbow_opal",
      nameVi: "Ngọc Mắt Mèo Cầu Vồng (Rainbow Opal)",
      nameEn: "Precious Rainbow Opal",
      colorHex: "#00f5d4",
      opticalProperty:
        "Iridescent play-of-color shifting across neon cyan, fiery red, gold, and violet with every angle",
      clarity: "Milky to translucent matrix with exploding spectrum flashes",
    },
    {
      id: "diamond",
      nameVi: "Kim Cương Trắng (Pure Diamond)",
      nameEn: "Flawless Pure Diamond",
      colorHex: "#e0fbfc",
      opticalProperty:
        "Hyper-brilliant adamantine luster, prismatic rainbow flare dispersion, razor-sharp reflections",
      clarity: "100% colorless D-flawless, infinite sparkling sparkle facets",
    },
    {
      id: "amber",
      nameVi: "Hổ Phách Hoàng Kim (Baltic Amber)",
      nameEn: "Golden Honey Amber",
      colorHex: "#f77f00",
      opticalProperty:
        "Warm golden-orange glow, resinous translucent depth, trapped micro-bubbles of light",
      clarity: "Warm sunlit honey translucency with rich golden halo",
    },
    {
      id: "imperial_jade",
      nameVi: "Ngọc Bích Hoàng Gia (Imperial Jade)",
      nameEn: "Imperial Translucent Jadeite",
      colorHex: "#2ec4b6",
      opticalProperty:
        "Sublime greasy vitreous luster, glowing emerald-mint green subsurface light transmission",
      clarity:
        "Semi-translucent mystical jade glow, smooth oily crystal texture",
    },
    {
      id: "tanzanite",
      nameVi: "Đá Tanzanite",
      nameEn: "Pleochroic Tanzanite",
      colorHex: "#5a189a",
      opticalProperty:
        "Mesmerizing tri-color pleochroism shifting between royal blue, violet, and deep burgundy",
      clarity: "Ultra-clear crystal with exotic velvet undertones",
    },
    {
      id: "obsidian",
      nameVi: "Hắc Diện Thạch (Black Obsidian)",
      nameEn: "Midnight Black Obsidian",
      colorHex: "#1b1b1e",
      opticalProperty:
        "Mirror-finish gloss black volcanic glass with razor-sharp conchoidal fracture edges",
      clarity:
        "Opaque pitch black with hyper-glossy reflections and iridescent rainbow sheen",
    },
    {
      id: "rose_quartz",
      nameVi: "Thạch Anh Hồng (Rose Quartz)",
      nameEn: "Star Rose Quartz",
      colorHex: "#ffafcc",
      opticalProperty:
        "Soft delicate baby pink with asterism 6-ray star light shimmering on the surface",
      clarity: "Translucent dreamy pink haze with soft romantic inner light",
    },
    {
      id: "aquamarine",
      nameVi: "Ngọc Xanh Biển (Aquamarine)",
      nameEn: "Santa Maria Aquamarine",
      colorHex: "#48cae4",
      opticalProperty:
        "Crisp glacial cyan-blue, ice-cold brilliance, pure water-like transparency",
      clarity:
        "Flawless frozen ocean water clarity with sparkling light ripples",
    },
  ],

  tech_jelly: [
    {
      id: "clear_jelly_gloss",
      nameVi: "Thạch Thủy Tinh Siêu Bóng",
      nameEn: "Hyper-Glossy Transparent Jelly",
      colorHex: "#00f0ff",
      opticalProperty:
        "Ultra-clear bouncy silicone jelly surface with wet liquid gloss highlights",
      clarity: "100% transparent high-refraction optical jelly",
    },
    {
      id: "synthwave_purple_silicone",
      nameVi: "Cao Su Dẻo Mềm Synthwave",
      nameEn: "Squishy Neon Synthwave Silicone",
      colorHex: "#9d00ff",
      opticalProperty:
        "Soft-touch squishy translucent purple silicone with internal neon laser refraction",
      clarity: "Translucent candy-like vibrant purple glow",
    },
    {
      id: "swarovski_hologram_crystal",
      nameVi: "Pha Lê Swarovski Hologram",
      nameEn: "Holographic Swarovski Crystal",
      colorHex: "#f43f5e",
      opticalProperty:
        "Prismatic faceted optical crystal with laser-etched holographic rainbow shimmer",
      clarity: "Ultra-sharp faceted diamond reflections",
    },
    {
      id: "tempered_iridescent_glass",
      nameVi: "Kính Cường Lực Xà Cừ",
      nameEn: "Iridescent Tempered Glass",
      colorHex: "#06b6d4",
      opticalProperty:
        "Multi-layer anti-reflective tempered glass with oil-slick rainbow color shifts",
      clarity: "Flawless smartphone screen glossiness",
    },
    {
      id: "frosted_cyberpunk_matte",
      nameVi: "Nhựa Mờ Frosted Cyberpunk",
      nameEn: "Frosted Cyberpunk Matte Polycarbonate",
      colorHex: "#10b981",
      opticalProperty:
        "Silky frosted matte exterior diffusing internal green and cyan LED lights",
      clarity: "Semi-translucent diffused soft glow",
    },
    {
      id: "anodized_electric_titanium",
      nameVi: "Titanium Ánh Kim Xanh Điện",
      nameEn: "Anodized Electric Blue Titanium",
      colorHex: "#3b82f6",
      opticalProperty:
        "Metallic brushed titanium finish with electric blue spectrum anodization",
      clarity: "High-sheen reflective aerospace metal luster",
    },
    {
      id: "pure_quartz_housing",
      nameVi: "Thạch Anh Trắng Trong Suốt",
      nameEn: "Pure Crystalline Quartz Housing",
      colorHex: "#ffffff",
      opticalProperty:
        "Natural optical quartz casing revealing micro-circuits with zero distortion",
      clarity: "Water-clear crystal transparency",
    },
    {
      id: "anodized_gold_aluminum",
      nameVi: "Nhôm Anode Mạ Vàng 24K",
      nameEn: "Luxury 24K Gold Anodized Aluminum",
      colorHex: "#f59e0b",
      opticalProperty:
        "Mirror-chamfered luxury gold metal frame with satin brush surfaces",
      clarity: "Rich warm metallic golden sheen",
    },
  ],

  cosmic_planet: [
    {
      id: "sapphire_ocean_crust",
      nameVi: "Đá Sapphire Đại Dương & Mây",
      nameEn: "Sapphire Ocean & Swirling Cloud Crust",
      colorHex: "#0077be",
      opticalProperty:
        "Deep royal sapphire waters overlaid with wispy translucent white cloud swirls",
      clarity: "Vivid celestial sphere with layered atmospheric depth",
    },
    {
      id: "amber_saturn_gas",
      nameVi: "Khí Quyển Hổ Phách & Vành Đai Nhẫn",
      nameEn: "Golden Amber Gas Bands & Diamond Rings",
      colorHex: "#e3bb7b",
      opticalProperty:
        "Alternating golden amber gas bands with floating micro-diamond rings",
      clarity: "Luminescent gas giant translucency",
    },
    {
      id: "moonstone_lunar_crater",
      nameVi: "Đá Mặt Trăng Moonstone Phát Quang",
      nameEn: "Ethereal Blue Flash Moonstone Crust",
      colorHex: "#f0f3f4",
      opticalProperty:
        "Cratered lunar surface radiating floating silver-blue adularescence glow",
      clarity: "Silky pearlescent moonlight sheen",
    },
    {
      id: "carnelian_mars_crust",
      nameVi: "Đá Carnelian Miệng Núi Lửa Magma",
      nameEn: "Textured Red Carnelian Volcanic Crust",
      colorHex: "#cc3300",
      opticalProperty:
        "Rugged red-orange gemstone canyon terrain with glowing magma fissures",
      clarity: "Semi-translucent fiery carnelian glow",
    },
    {
      id: "obsidian_void_shell",
      nameVi: "Hắc Diện Thạch Hút Ánh Sáng",
      nameEn: "Ultra-Dense Obsidian Singularity Shell",
      colorHex: "#0b001a",
      opticalProperty:
        "Light-bending midnight black glass orb with glowing purple accretion disk",
      clarity: "Infinite void depth absorbing light reflections",
    },
    {
      id: "marble_storm_jupiter",
      nameVi: "Đá Cẩm Thạch Xoáy Bão Đỏ",
      nameEn: "Marble Gas Bands with Ruby Storm Eye",
      colorHex: "#d97706",
      opticalProperty:
        "Mesmerizing swirling bands of ochre marble and vivid crimson storm vortex",
      clarity: "Multi-layered dynamic gas turbulence",
    },
    {
      id: "blazing_plasma_corona",
      nameVi: "Khối Plasma Nhiệt Hạch Rực Lửa",
      nameEn: "Nuclear Blazing Plasma Corona",
      colorHex: "#ef4444",
      opticalProperty:
        "Blinding incandescent solar energy with dancing fiery prominence loops",
      clarity: "High-intensity white-hot nuclear brilliance",
    },
    {
      id: "azure_methane_ice",
      nameVi: "Băng Methan Lam Ngọc Sâu Thẳm",
      nameEn: "Deep Cobalt Azure Methane Ice",
      colorHex: "#3b82f6",
      opticalProperty:
        "Deep frozen azure crystal with supersonic white cirrus streaks",
      clarity: "Frozen glacial depth with electric blue refraction",
    },
  ],

  illusion_cake: [
    {
      id: "pure_gold_mirror_shell",
      nameVi: "Thỏi Vàng 9999 Đúc Sáng Bóng",
      nameEn: "Mirror-Polished 9999 Pure Gold Shell",
      colorHex: "#ffd700",
      opticalProperty:
        "100% mirror-finish 24K gold ingot surface with crisp stamped hallmarks",
      clarity: "Hyper-reflective metallic gold perfection",
    },
    {
      id: "rough_clay_brick_crust",
      nameVi: "Gạch Nung Đất Sét Thô Ráp",
      nameEn: "Rough Construction Clay Brick Crust",
      colorHex: "#b22222",
      opticalProperty:
        "Porous rough terracotta clay texture with realistic masonry sand specks",
      clarity: "100% matte construction material realism",
    },
    {
      id: "rustic_bark_moss_shell",
      nameVi: "Vỏ Vân Gỗ Rêu Phong Cổ Thụ",
      nameEn: "Rustic Tree Bark & Moss Exterior",
      colorHex: "#5c4033",
      opticalProperty:
        "Rugged tree bark fissures with velvet green moss patches",
      clarity: "Organic natural wood grain realism",
    },
    {
      id: "pastel_marble_soap_block",
      nameVi: "Khối Xà Phòng Cẩm Thạch Siêu Mịn",
      nameEn: "Pastel Marble Soap Kinetic Block",
      colorHex: "#e0ffff",
      opticalProperty:
        "Silky smooth satin-finish marble swirls in mint and lavender",
      clarity: "Translucent wax-like buttery smoothness",
    },
    {
      id: "grey_cinder_concrete",
      nameVi: "Bê Tông Xám Nhám Bọt Khí",
      nameEn: "Porous Grey Concrete Cinder Shell",
      colorHex: "#94a3b8",
      opticalProperty:
        "Gritty aggregate stone texture with realistic micro-cavities",
      clarity: "Industrial matte concrete authenticity",
    },
    {
      id: "matte_pink_eraser_rubber",
      nameVi: "Cao Su Hồng Lì Cục Tẩy",
      nameEn: "Matte Pink Rubber Eraser Crust",
      colorHex: "#f472b6",
      opticalProperty:
        "Uniform velvety matte pink surface with bevel cutting corners",
      clarity: "Soft-touch tactile rubber finish",
    },
    {
      id: "rusted_cast_iron_patina",
      nameVi: "Kim Loại Rỉ Sét Nâu Đỏ",
      nameEn: "Heavily Rusted Cast Iron Shell",
      colorHex: "#78350f",
      opticalProperty:
        "Corroded oxidized iron with textured orange-brown rust flakes",
      clarity: "Hyper-realistic vintage metal patina",
    },
    {
      id: "gilded_antique_leather",
      nameVi: "Da Thuộc Dập Nổi Mạ Vàng",
      nameEn: "Embossed Antique Gilded Leather",
      colorHex: "#854d0e",
      opticalProperty:
        "Aged cracked leather grain with gold leaf decorative inlays",
      clarity: "Rich warm vintage bookbinding texture",
    },
  ],

  dragon_egg: [
    {
      id: "ice_dragon_scales",
      nameVi: "Vảy Pha Lê Băng Tuyết Sương Mờ",
      nameEn: "Cryogenic Ice Dragon Scales",
      colorHex: "#a0e6ff",
      opticalProperty:
        "Interlocking razor-sharp ice crystal scales emitting chilled white mist",
      clarity: "Translucent frost-rimmed glacial brilliance",
    },
    {
      id: "volcanic_basalt_magma_scales",
      nameVi: "Vảy Bazan Đen Khe Nứt Magma",
      nameEn: "Black Basalt Volcanic Lava Veins",
      colorHex: "#ff4500",
      opticalProperty:
        "Opaque obsidian dragon scales pulsing with molten crimson veins",
      clarity: "Dark volcanic stone with glowing incandescent fissures",
    },
    {
      id: "citrine_honeycomb_matrix",
      nameVi: "Sáp Ong Citrine Lục Giác",
      nameEn: "Translucent Citrine Honeycomb Shell",
      colorHex: "#e5a50a",
      opticalProperty:
        "Geometric hexagonal grid of pure golden citrine crystal cells",
      clarity: "Sunlit translucent amber gemstone clarity",
    },
    {
      id: "petrified_fossil_matrix",
      nameVi: "Khối Hóa Thạch Triệu Năm",
      nameEn: "Rough Petro-Matrix Fossil Shell",
      colorHex: "#d97706",
      opticalProperty:
        "Ancient sedimentary stone encasing glowing prehistoric amber deposits",
      clarity: "Textured archaeological mineral shell",
    },
    {
      id: "blue_titanium_lightning_scales",
      nameVi: "Vảy Titanium Xanh Sấm Sét",
      nameEn: "Blue Titanium Thunder Scales",
      colorHex: "#38bdf8",
      opticalProperty:
        "Metallic electric blue scales crackling with micro-plasma arcs",
      clarity: "High-voltage conductive metallic luster",
    },
    {
      id: "ancient_moss_agate_shell",
      nameVi: "Mã Não Rêu Xanh Cổ Thụ",
      nameEn: "Ancient Moss Agate Crystalline Shell",
      colorHex: "#15803d",
      opticalProperty:
        "Deep forest green mineral patterns with trapped bioluminescent roots",
      clarity: "Semi-translucent botanical gemstone depth",
    },
    {
      id: "shadow_obsidian_scales",
      nameVi: "Vảy Hắc Diện Thạch Bóng Đêm",
      nameEn: "Mirror Black Obsidian Scales",
      colorHex: "#18181b",
      opticalProperty:
        "Pitch-black mirror scales reflecting iridescent purple moonlight",
      clarity: "Hyper-glossy shadow glass finish",
    },
    {
      id: "granite_stalactite_egg",
      nameVi: "Đá Hoa Cương Hang Thạch Nhũ",
      nameEn: "Rough Grey Granite Stalactite Shell",
      colorHex: "#7e22ce",
      opticalProperty:
        "Speckled grey mineral crust hiding a cavern of sharp amethyst teeth",
      clarity: "Rugged natural geode outer matrix",
    },
  ],

  ocean_crystal: [
    {
      id: "golden_ratio_nautilus_shell",
      nameVi: "Xà Cừ Tỷ Lệ Vàng Óng Ánh",
      nameEn: "Iridescent Mother-of-Pearl Spiral",
      colorHex: "#fef3c7",
      opticalProperty:
        "Fibonacci spiral shell with iridescent rainbow lustre shifting in ocean light",
      clarity: "Luminous organic mother-of-pearl sheen",
    },
    {
      id: "aquamarine_sea_glass",
      nameVi: "Thủy Tinh Aquamarine Biển Sâu",
      nameEn: "Translucent Aquamarine Sea Glass",
      colorHex: "#06b6d4",
      opticalProperty:
        "Pure sea-green and cyan glass body with micro-crystal pearl studs",
      clarity: "Crystal-clear tropical water transparency",
    },
    {
      id: "deep_ocean_marble_clam",
      nameVi: "Vỏ Sò Cẩm Thạch Lam Sâu",
      nameEn: "Deep Ocean Marble Clam Shell",
      colorHex: "#1e293b",
      opticalProperty:
        "Hand-carved indigo and navy marble with delicate white calcified ridges",
      clarity: "Polished deep-sea mineral smoothness",
    },
    {
      id: "borosilicate_jellyfish_bell",
      nameVi: "Thủy Tinh Borosilicate Sứa",
      nameEn: "Ultra-Delicate Blown Glass Bell",
      colorHex: "#c084fc",
      opticalProperty:
        "Paper-thin transparent glass canopy glowing with internal lilac luminescence",
      clarity: "100% clear delicate glass refractions",
    },
    {
      id: "porcelain_pink_conch",
      nameVi: "Sứ Trắng Hồng Xà Cừ Hoàng Gia",
      nameEn: "Glossy Porcelain Pink Conch Shell",
      colorHex: "#fda4af",
      opticalProperty:
        "High-gloss porcelain pink interior reflecting golden sunbeams",
      clarity: "Velvety smooth pearlescent glow",
    },
    {
      id: "crimson_quartz_coral",
      nameVi: "San Hô Ruby Tinh Thể Đỏ",
      nameEn: "Branching Crimson Quartz Coral",
      colorHex: "#f43f5e",
      opticalProperty:
        "Faceted red beryl coral branches sparkling like stained glass underwater",
      clarity: "Vivid crimson gemstone luminescence",
    },
    {
      id: "carved_amber_seahorse",
      nameVi: "Giáp Hổ Phách Cá Ngựa Vàng",
      nameEn: "Carved Golden Amber Seahorse Armor",
      colorHex: "#d97706",
      opticalProperty:
        "Faceted Baltic amber scales with sunlit orange highlights and trapped dewdrops",
      clarity: "Glowing golden resin translucency",
    },
    {
      id: "frosted_mint_sea_glass",
      nameVi: "Sỏi Biển Thủy Tinh Mài Mờ",
      nameEn: "Tumbled Frosted Mint Sea Glass",
      colorHex: "#67e8f9",
      opticalProperty:
        "Sea-tumbled frosted exterior revealing razor-sharp water-clear core",
      clarity: "Soft frosted gradient with brilliant center",
    },
  ],
};

// ==========================================
// 3. FILLINGS / INTERNAL CORES BY CATEGORY
// ==========================================
export const FILLINGS_BY_CATEGORY: Record<ItemCategory, FluidItem[]> = {
  fruit: [
    {
      id: "golden_honey_amber",
      nameVi: "Mật Ong Hổ Phách & Vàng Lỏng",
      nameEn: "Viscous Golden Amber Honey & Liquid Gold",
      viscosity:
        "Super-thick sticky golden syrup stretching in delicate glass-like threads",
      visualEffect:
        "Warm internal backlight, trapped tiny light bubbles creating golden bokeh",
      colorHex: "#ffb703",
    },
    {
      id: "galaxy_swirl_milk",
      nameVi: "Sữa Ngân Hà Xoáy Cầu Vồng",
      nameEn: "Iridescent Galaxy Swirl Milk",
      viscosity: "Smooth velvety milk with swirling fluid dynamics",
      visualEffect:
        "Swirling blue, violet, and silver stardust nebula patterns glowing under blade",
      colorHex: "#7209b7",
    },
    {
      id: "liquid_diamond_tears",
      nameVi: "Nước Mắt Kim Cương Pha Lê",
      nameEn: "Liquid Diamond Tears",
      viscosity:
        "Ultra-pure crystalline water with low surface tension splashing in slow motion",
      visualEffect:
        "Splits incoming light into full prismatic rainbow flares, hyper-reflective droplets",
      colorHex: "#caf0f8",
    },
    {
      id: "sparkling_molten_lava",
      nameVi: "Dung Nham Rực Lửa Lấp Lánh",
      nameEn: "Sparkling Molten Ruby Lava",
      viscosity: "Slow-flowing luminous magma honey dripping in beads",
      visualEffect:
        "Fiery gold and crimson incandescent glow with tiny floating embers that glitter",
      colorHex: "#ff4d00",
    },
    {
      id: "bioluminescent_nectar",
      nameVi: "Mật Phát Sáng Neon Teal",
      nameEn: "Bioluminescent Glowing Teal Nectar",
      viscosity: "Viscous thick glowing syrup oozing slowly in high gravity",
      visualEffect:
        "Emits a bright neon electric teal and cyan glow, trailing glowing micro-spark particles",
      colorHex: "#00f5d4",
    },
    {
      id: "emerald_magic_elixir",
      nameVi: "Tiên Dược Ngọc Lục Bảo",
      nameEn: "Glowing Emerald Elixir",
      viscosity:
        "Bright radioactive green viscous serum with smooth slow-drip physics",
      visualEffect:
        "Vibrant green phosphorescence leaving glowing trails on the cutting knife",
      colorHex: "#52b788",
    },
    {
      id: "dragon_blood_plasma",
      nameVi: "Huyết Rồng Plasma Đỏ Thẫm",
      nameEn: "Radiant Dragon Blood Serum",
      viscosity:
        "Deep ruby-red viscous elixir pulsing with gentle luminescence",
      visualEffect:
        "Deep scarlet red fluid with internal golden shimmer veins glowing under blade pressure",
      colorHex: "#9e2a2b",
    },
    {
      id: "champagne_sparkle_fizz",
      nameVi: "Bọt Sủi Champagne Vàng",
      nameEn: "Effervescent Golden Champagne Fizz",
      viscosity:
        "Light bubbly golden fluid foaming and fizzing with carbonated energy",
      visualEffect:
        "Thousands of micro-bubbles bursting into golden light mist upon slice",
      colorHex: "#ffd166",
    },
  ],

  tech_jelly: [
    {
      id: "liquid_neon_electricity",
      nameVi: "Dòng Điện Lỏng Neon Cyan",
      nameEn: "Liquid Neon Cyan Electricity",
      viscosity: "Hyper-fluid luminescent cybernetic liquid with zero friction",
      visualEffect:
        "Electric cyan and magenta glowing fluid sparking with tiny harmless micro-lightning arcs",
      colorHex: "#00ffff",
    },
    {
      id: "hologram_circuit_sparks",
      nameVi: "Vi Mạch Hologram & Tia Sét Micro",
      nameEn: "Holographic Motherboard & Micro-Lightning",
      viscosity:
        "Glowing plasma current flowing through printed circuit traces",
      visualEffect:
        "Pulsing neon geometric trace lines releasing micro-electric sparks as cut opens",
      colorHex: "#38bdf8",
    },
    {
      id: "fiber_optic_glow_strands",
      nameVi: "Sợi Cáp Quang Phát Quang",
      nameEn: "Glowing Fiber Optic Micro-Strands",
      viscosity: "Flexible glowing optical threads stretching before snapping",
      visualEffect:
        "Laser light pulses traveling through thousand micro-fiber threads in slow motion",
      colorHex: "#ec4899",
    },
    {
      id: "pulsing_soundwave_particles",
      nameVi: "Hạt Sóng Âm Dạ Quang",
      nameEn: "Pulsing Soundwave Acoustic Particles",
      viscosity:
        "Suspended glowing sonic vapor behaving like anti-gravity droplets",
      visualEffect:
        "Concentric acoustic ring waves bursting outwards in luminous cyan circles",
      colorHex: "#8b5cf6",
    },
    {
      id: "neon_coolant_liquid",
      nameVi: "Dung Dịch Tản Nhiệt Xanh Neon",
      nameEn: "Fluorescent Green Liquid Coolant",
      viscosity:
        "Low-viscosity sparkling coolant flowing smoothly down blade facets",
      visualEffect:
        "Ultra-bright UV reactive chartreuse green liquid with micro-bubbles",
      colorHex: "#10b981",
    },
    {
      id: "squishy_lilac_gel",
      nameVi: "Gel Thạch Tím Chống Rung",
      nameEn: "Squishy Lilac Silicone Gel",
      viscosity:
        "Elastic jelly bouncing and stretching smoothly on cross-section",
      visualEffect:
        "Translucent purple gel with holographic glitter specks shimmering in studio lights",
      colorHex: "#a855f7",
    },
    {
      id: "magnetic_tape_ribbons",
      nameVi: "Dải Băng Từ Tính Synthwave",
      nameEn: "Glowing Magnetic Cassette Ribbon",
      viscosity:
        "Silky thin magnetic tape curling and cascading in hypnotic coils",
      visualEffect:
        "Reflective chrome and neon magenta ribbon unraveling with acoustic perfection",
      colorHex: "#f43f5e",
    },
    {
      id: "rainbow_pearl_air_bubbles",
      nameVi: "Hạt Bọt Ngọc Trai Cầu Vồng",
      nameEn: "Liquid Rainbow Micro-Pearls",
      viscosity:
        "Effervescent gel cushion foaming with iridescent micro-spheres",
      visualEffect:
        "Thousands of shimmering pastel pearl beads rolling out like liquid caviar",
      colorHex: "#f472b6",
    },
  ],

  cosmic_planet: [
    {
      id: "molten_magma_gold_core",
      nameVi: "Lõi Magma Vàng Rực Lửa",
      nameEn: "Molten Magma Golden Core",
      viscosity:
        "Slow-moving incandescent lava syrup dripping with immense heat",
      visualEffect:
        "Blazing golden-orange core glow with glowing volcanic embers and floating crust pieces",
      colorHex: "#ff4500",
    },
    {
      id: "swirling_purple_nebula",
      nameVi: "Khí Tinh Vân Tím Xoáy Tròn",
      nameEn: "Swirling Purple Nebula Gas",
      viscosity: "Zero-gravity atmospheric vapor swirling in hypnotic eddies",
      visualEffect:
        "Deep violet, magenta, and cosmic blue gas clouds expanding in slow motion",
      colorHex: "#9333ea",
    },
    {
      id: "cascading_stardust_rain",
      nameVi: "Mưa Bụi Sao Băng Rơi Chậm",
      nameEn: "Cascading Stardust & Meteor Particles",
      viscosity:
        "Fine sparkling cosmic powder falling like liquid diamond rain",
      visualEffect:
        "Millions of micro-starlight flecks drifting slowly downwards with golden trails",
      colorHex: "#fde047",
    },
    {
      id: "superionic_methane_slush",
      nameVi: "Băng Methan Xanh Siêu Nén",
      nameEn: "Superionic Azure Diamond Slush",
      viscosity: "Dense icy slush crystalizing instantly in vacuum",
      visualEffect:
        "Electric blue frozen crystals shedding glittering ice mist upon slice",
      colorHex: "#38bdf8",
    },
    {
      id: "dark_matter_void_stream",
      nameVi: "Dòng Chảy Hư Không Đen Tuyền",
      nameEn: "Dark Matter Cosmic Void Stream",
      viscosity: "Ultra-viscous space-time fluid bending background light",
      visualEffect:
        "Pitch-black gravitational vortex bordered by glowing ultraviolet accretion rings",
      colorHex: "#1e1b4b",
    },
    {
      id: "pulsar_radiation_plasma",
      nameVi: "Bão Từ Trường Sóng Bức Xạ",
      nameEn: "Pulsar Polar Radiation Plasma",
      viscosity: "Super-charged ionized light beam bursting vertically",
      visualEffect:
        "Twin violet laser beams flashing with high-speed rhythmic electromagnetic pulses",
      colorHex: "#c084fc",
    },
    {
      id: "liquid_metallic_hydrogen",
      nameVi: "Khí Quyển Hydro Lỏng Ánh Kim",
      nameEn: "Liquid Metallic Hydrogen Glow",
      viscosity: "Mirror-sheen liquid metal with warm amber luminescence",
      visualEffect:
        "Liquid chrome swirls reflecting cosmic background stars in 360 degrees",
      colorHex: "#fbbf24",
    },
  ],

  illusion_cake: [
    {
      id: "red_velvet_cream_cheese",
      nameVi: "Cốt Bánh Red Velvet & Kem Cheese",
      nameEn: "Moist Red Velvet & White Cream Cheese Layers",
      viscosity: "Ultra-soft crumbly sponge with silky smooth piping cream",
      visualEffect:
        "Deep crimson velvety cake texture contrasting with pure white cream cheese layers",
      colorHex: "#991b1b",
    },
    {
      id: "dark_chocolate_salted_caramel",
      nameVi: "Mousse Sô-cô-la & Caramel Muối",
      nameEn: "Dark Chocolate Mousse & Salted Caramel",
      viscosity:
        "Dense rich chocolate mousse with super-gooey stretching caramel",
      visualEffect:
        "Glossy warm salted caramel slowly oozing down dark velvet chocolate slices",
      colorHex: "#d97706",
    },
    {
      id: "matcha_gelee_amber_sap",
      nameVi: "Thạch Matcha & Mật Ong Hoàng Gia",
      nameEn: "Layered Matcha Gelee & Golden Honey Sap",
      viscosity: "Gelatinous translucent tea jelly with dripping tree honey",
      visualEffect:
        "Vibrant forest green matcha layers releasing warm amber honey drops",
      colorHex: "#16a34a",
    },
    {
      id: "shaved_soap_ribbons",
      nameVi: "Dải Ruy-Băng Sáp Cuộn Tròn",
      nameEn: "Glowing Shaved Soap Ribbons",
      viscosity: "Paper-thin silky wax strips curling seamlessly under blade",
      visualEffect:
        "Hypnotic pastel ribbon curls piling up with crisp acoustic shaving precision",
      colorHex: "#a7f3d0",
    },
    {
      id: "flowing_kinetic_sand_waves",
      nameVi: "Cát Động Lực Sụp Đổ Mịn Màng",
      nameEn: "Flowing Kinetic Sand Waves",
      viscosity: "Zero-dust velvety micro-sand collapsing in fluid layers",
      visualEffect:
        "Clean razor-sharp cut line melting immediately into mesmerizing cascading sand ribbons",
      colorHex: "#fde047",
    },
    {
      id: "strawberry_chiffon_ruby_jam",
      nameVi: "Chiffon Dâu Tây & Mứt Dâu Đỏ",
      nameEn: "Fluffy Strawberry Chiffon & Ruby Jam",
      viscosity: "Airy cloud-like sponge cake with glossy fruit seed jam",
      visualEffect:
        "Soft pastel pink crumb with glistening ruby red strawberry compote center",
      colorHex: "#fb7185",
    },
    {
      id: "hazelnut_praline_espresso",
      nameVi: "Kẹo Praline Hạt Phỉ & Ganache Cà Phê",
      nameEn: "Hazelnut Praline & Dark Espresso Ganache",
      viscosity: "Crunchy caramelized nut paste with silky dark coffee ganache",
      visualEffect:
        "Textured golden nut flakes embedded in glistening dark espresso cream",
      colorHex: "#78350f",
    },
    {
      id: "cookies_and_cream_sponge",
      nameVi: "Bánh Cookies & Cream Đen Đậm",
      nameEn: "Black Cocoa Sponge & Vanilla Buttercream",
      viscosity: "Moist dark Oreo cookie cake with thick fluffy vanilla cream",
      visualEffect:
        "Stark black-and-white layered contrast looking identical to construction concrete",
      colorHex: "#334155",
    },
  ],

  dragon_egg: [
    {
      id: "molten_gold_dragon_yolk",
      nameVi: "Lòng Đỏ Hoàng Kim Tỏa Nhiệt",
      nameEn: "Liquid Molten Gold Dragon Yolk",
      viscosity: "Thick incandescent yolk oozing like molten liquid 24K gold",
      visualEffect:
        "Spherical golden core bursting into glowing syrup that emits soft thermal heat glow",
      colorHex: "#eab308",
    },
    {
      id: "cryogenic_frost_mist",
      nameVi: "Sương Khói Băng Lạnh Lam Ngọc",
      nameEn: "Glowing Cryogenic Mist & Liquid Sapphire",
      viscosity: "Sub-zero bubbling liquid nitrogen with sapphire dew beads",
      visualEffect:
        "Dense cascading white fog rolling off glowing frozen azure crystalline core",
      colorHex: "#38bdf8",
    },
    {
      id: "royal_citrine_jelly",
      nameVi: "Mật Ong Chúa & Phấn Hoa Citrine",
      nameEn: "Thick Royal Jelly & Citrine Pollen",
      viscosity: "Ultra-dense glowing royal nectar overflowing hexagonal cells",
      visualEffect:
        "Warm golden honey bubbling with sparkling micro-pollen light motes",
      colorHex: "#f59e0b",
    },
    {
      id: "amber_prehistoric_feather",
      nameVi: "Lông Vũ Hổ Phách Phát Sáng",
      nameEn: "Luminescent Amber Feather Inclusions",
      viscosity:
        "Pristine liquid amber solidifying with trapped glowing plumage",
      visualEffect:
        "Translucent golden core revealing iridescent prehistoric feather barbules",
      colorHex: "#d97706",
    },
    {
      id: "plasma_ball_lightning",
      nameVi: "Tia Chớp Plasma Siêu Cao Thế",
      nameEn: "High-Voltage Plasma Ball Lightning",
      viscosity:
        "Pure crackling energy ball encapsulated in electromagnetic field",
      visualEffect:
        "Violent electric blue and purple lightning tendrils dancing inside egg chamber",
      colorHex: "#0284c7",
    },
    {
      id: "emerald_life_sap",
      nameVi: "Nhựa Sống Ngọc Lục Bảo Rừng Già",
      nameEn: "Viscous Glowing Emerald Life Sap",
      viscosity:
        "Luminous forest green plant nectar flowing with gentle vitality",
      visualEffect:
        "Vibrant phosphorescent green serum coating eggshell facets in slow motion",
      colorHex: "#16a34a",
    },
    {
      id: "shadow_violet_mist",
      nameVi: "Làn Khói Bóng Đêm Huyền Bí",
      nameEn: "Swirling Violet Shadow Mist",
      viscosity:
        "Weightless dark matter smoke expanding into velvet studio background",
      visualEffect:
        "Midnight purple shadow tendrils dissolving into sparkling dark stardust",
      colorHex: "#7e22ce",
    },
    {
      id: "stalactite_dew_cavern",
      nameVi: "Hang Thạch Nhũ Đọng Sương Mai",
      nameEn: "Glittering Crystal Stalactite Dew",
      viscosity:
        "Crystal clear mineral nectar dripping from sharp amethyst tips",
      visualEffect:
        "Micro-droplets reflecting infinite studio lights inside hollow purple geode",
      colorHex: "#a855f7",
    },
  ],

  ocean_crystal: [
    {
      id: "bioluminescent_ocean_foam",
      nameVi: "Bọt Sóng Đại Dương Lam Ngọc",
      nameEn: "Bioluminescent Turquoise Wave Foam",
      viscosity: "Frothy crystal-clear ocean water with glowing deep-sea foam",
      visualEffect:
        "Phosphorescent turquoise waves emitting soft neon glow under knife impact",
      colorHex: "#06b6d4",
    },
    {
      id: "tahiti_black_pearl_core",
      nameVi: "Viên Ngọc Trai Đen Tahiti Phát Sáng",
      nameEn: "Luminous Tahiti Black Pearl Core",
      viscosity:
        "Liquid mother-of-pearl coating rolling over mirror-finish black sphere",
      visualEffect:
        "Giant iridescent peacock-green and violet black pearl radiating ethereal light",
      colorHex: "#0f172a",
    },
    {
      id: "deep_sea_cyan_gel",
      nameVi: "Gel Sinh Học Biển Sâu Phát Quang",
      nameEn: "Deep-Sea Glowing Cyan Gel",
      viscosity:
        "Ultra-smooth translucent marine slime with suspension floating dots",
      visualEffect:
        "Electric aqua phosphorescence illuminating internal chambers in darkness",
      colorHex: "#22d3ee",
    },
    {
      id: "plankton_biolum_mist",
      nameVi: "Phù Du Biển Đêm Tỏa Sáng",
      nameEn: "Luminescent Marine Plankton Mist",
      viscosity: "Microscopic glowing seawater spray drifting like ocean fog",
      visualEffect:
        "Thousands of sparkling blue dinoflagellate sparkles igniting with movement",
      colorHex: "#38bdf8",
    },
    {
      id: "sunlit_caustic_dew",
      nameVi: "Sương Biển Nắng Vàng Khúc Xạ",
      nameEn: "Sunlit Caustic Ocean Water Beads",
      viscosity: "Pure tropical ocean dew rolling over rose quartz shell walls",
      visualEffect:
        "Dancing caustic sunlight webs projecting golden shimmer across pedestal",
      colorHex: "#fef08a",
    },
    {
      id: "golden_uni_coral_cream",
      nameVi: "Trứng Nhím Biển Uni Vàng Kem",
      nameEn: "Rich Golden Uni Coral Cream",
      viscosity:
        "Luxurious creamy golden sea custard with delicate ocean sheen",
      visualEffect:
        "Velvety golden sea urchin roe texture with glistening salt dew drops",
      colorHex: "#f59e0b",
    },
    {
      id: "liquid_coral_essence",
      nameVi: "Dòng Chảy San Hô Hồng Ngọc",
      nameEn: "Liquid Rose Coral Essence",
      viscosity: "Viscous crimson sea nectar dripping in slow rhythmic beads",
      visualEffect:
        "Translucent ruby red fluid trailing glittering coral dust particles",
      colorHex: "#f43f5e",
    },
  ],
};

// Export GEMSTONES and FLUIDS as default fruit list for full backwards-compatibility
export const GEMSTONES: GemstoneItem[] = MATERIALS_BY_CATEGORY.fruit;
export const FLUIDS: FluidItem[] = FILLINGS_BY_CATEGORY.fruit;

export const TOOLS: ToolItem[] = [
  {
    id: "stainless_steel_chef_knife",
    nameVi: "Dao Bếp Inox Chuẩn (Sharp Chef Knife)",
    nameEn: "Sharp Stainless Steel Chef Knife",
    bladeType:
      "Sleek brushed stainless steel chef knife blade with razor-sharp polished bevel edge",
    effectOnCut:
      "Cleanly slices vertically down through the center of the gemstone fruit and its seed, cleanly splitting the two halves apart as rich liquid smoothly oozes out",
  },
  {
    id: "hot_knife_1000",
    nameVi: "Dao Nung Nóng 1000°C (1000° Hot Knife)",
    nameEn: "1000 Degree Glowing Red Hot Knife",
    bladeType:
      "Superheated glowing orange-red steel blade with heat distortion ripples in the air",
    effectOnCut:
      "Melts effortlessly through the crystal fruit with sizzling steam and glowing liquid sizzle",
  },
  {
    id: "crystal_scalpel",
    nameVi: "Dao Pha Lê Trong Suốt (Crystal Scalpel)",
    nameEn: "Diamond-Edge Crystal Scalpel",
    bladeType:
      "Ultra-thin transparent diamond scalpel with razor-sharp refractive bevel edge",
    effectOnCut:
      "Executes a microscopically clean surgical slice, making crisp acoustic cracking sounds",
  },
  {
    id: "plasma_laser_cutter",
    nameVi: "Lưỡi Cắt Laser Plasma (Plasma Laser Cutter)",
    nameEn: "Futuristic Cyan Plasma Laser Blade",
    bladeType:
      "Concentrated beam of glowing neon cyan plasma energy with electric spark arcs",
    effectOnCut:
      "Vaporizes the cut line with electric particle sparks and instant liquid eruption",
  },
  {
    id: "black_obsidian_knife",
    nameVi: "Dao Obsidian Hắc Diện Thạch (Obsidian Blade)",
    nameEn: "Flaked Mirror Obsidian Dagger",
    bladeType:
      "Hand-knapped obsidian blade with razor-sharp glossy black serrations",
    effectOnCut:
      "Splits the gemstone with raw satisfying tactile snap and fluid spill",
  },
  {
    id: "gold_titanium_chef_knife",
    nameVi: "Dao Bếp Titanium Mạ Vàng (Gold Titanium Blade)",
    nameEn: "Luxury 24K Gold Titanium Chef Knife",
    bladeType:
      "Mirror-polished gold Damascus steel with intricate wavy organic patterns",
    effectOnCut:
      "Slides smoothly downward in extreme slow motion with satisfying fluid coating on the blade",
  },
  {
    id: "ultrasonic_katana",
    nameVi: "Thanh Kiếm Katana Sóng Âm (Ultrasonic Blade)",
    nameEn: "High-Frequency Ultrasonic Katana Blade",
    bladeType:
      "Vibrating frosted chrome blade with visible acoustic sonic rings",
    effectOnCut:
      "Effortlessly divides the gemstone causing fluid to atomize into glittering mist",
  },
];

export const AESTHETICS: AestheticStyle[] = [
  {
    id: "minimalist_dark_slate",
    nameVi: "Bàn Đá Phiến Đen Tối Giản (Minimalist Dark Slate)",
    nameEn: "Minimalist Dark Polished Slate Tabletop",
    lightingPrompt:
      "Soft studio lighting, 8k resolution, photorealistic, cinematic lighting, shallow depth of field, centered composition, resting on a minimalist dark polished slate tabletop",
    backgroundPrompt:
      "Minimalist dark polished slate tabletop with soft diffused studio lighting and subtle elegant reflections",
  },
  {
    id: "dark_macro_studio",
    nameVi: "Macro Studio Tối Sang Trọng (Dark Luxury Studio)",
    nameEn: "Dark Luxury Macro Studio",
    lightingPrompt:
      "Dramatic rim lighting, soft top key light, pitch-black background with subtle reflections on polished obsidian pedestal, 8k cinematic commercial look",
    backgroundPrompt:
      "Infinite velvet black studio background, clean reflection on glossy black mirror floor",
  },
  {
    id: "neon_cyberpunk",
    nameVi: "Neon Moody Huyền Bí (Neon Cyberpunk)",
    nameEn: "Moody Neon Cyberpunk Glow",
    lightingPrompt:
      "Dual-tone pink and cyan neon side rim lights, atmospheric volumetric haze, glowing particle bokeh in background",
    backgroundPrompt:
      "Dark futuristic laboratory cutting station with glowing neon grid accents",
  },
  {
    id: "backlit_translucent",
    nameVi: "Chiếu Sáng Xuyên Thấu Quang Học (Backlit Translucency)",
    nameEn: "Backlit Translucent Optical Brilliance",
    lightingPrompt:
      "Intense backlight shining directly through the gemstone fruit revealing intricate internal facets, caustics, and liquid glow",
    backgroundPrompt:
      "Soft gradient twilight backdrop with dancing caustic light webs",
  },
  {
    id: "marble_gold_pedestal",
    nameVi: "Đá Cẩm Thạch & Vàng Sang Trọng (Luxury Marble & Gold)",
    nameEn: "Luxury White Carrara Marble with Gold Inlays",
    lightingPrompt:
      "Clean museum spotlighting, warm golden ambient fill, crystal-clear lens reflections",
    backgroundPrompt:
      "Carved Carrara white marble slab with liquid gold seams (Kintsugi style)",
  },
];

export const VIDEO_PLATFORMS: VideoPlatformStyle[] = [
  {
    id: "gemini_veo",
    name: "Google Gemini Video / Veo 2 (Khuyên dùng)",
    description:
      "Nền tảng tạo Video AI hàng đầu từ Google DeepMind & Gemini. Tối ưu cho chuyển động vật lý chất lỏng siêu thực, slow-motion 60fps và morphing từ ảnh Start sang End.",
    defaultParams:
      "Mode: High Fidelity / 4K | 60fps Slow Motion | First & Last Frame Interpolation",
    motionKeywords:
      "A sharp knife cleanly slices vertically down through the center of the gemstone fruit and its core, cleanly splitting the two halves apart. Thick, luxurious glowing liquid smoothly oozes and cascades out from the cracked center core, satisfying fluid physics, extreme macro close-up, 4k ultra-detailed, slow motion.",
  },
  {
    id: "kling_ai",
    name: "Kling AI (1.5 / 1.6 / 2.0)",
    description:
      "Tối ưu cho tính năng First Frame & Last Frame của Kling. Mô tả chi tiết lực cắt thẳng đứng qua tâm, dòng chảy chất lỏng và chuyển động camera.",
    defaultParams: "Mode: High Quality | Motion: 5 | Duration: 5s / 10s",
    motionKeywords:
      "A sharp knife cleanly slices vertically down through the center of the gemstone fruit and its core, cleanly splitting the two halves apart. Thick, luxurious liquid smoothly oozes and cascades out from the cracked center core, satisfying fluid physics, extreme macro close-up, 4k ultra-detailed, slow motion.",
  },
  {
    id: "runway_gen3",
    name: "Runway Gen-3 Alpha Turbo",
    description:
      "Tối ưu cho chế độ Start Frame + End Frame, hỗ trợ camera tracking và tốc độ chuyển động vật lý cao cấp.",
    defaultParams: "Motion: 4 | Camera: Slow push in | First & Last Frame mode",
    motionKeywords:
      "Cinematic slow motion cut: The glowing blade descends through the crystal fruit, cleanly slicing it open. As the two halves separate, glistening luminescent nectar bursts out in slow motion droplets. Photorealistic light caustic refractions, 60fps.",
  },
  {
    id: "luma_dream",
    name: "Luma Dream Machine",
    description:
      "Tối ưu cho chuyển động mượt (camera push-in và morphing tự nhiên không bị biến dạng hình thể).",
    defaultParams: "Mode: Frame-to-Frame Transition | Prompt Guidance: 7.5",
    motionKeywords:
      "A smooth continuous high-frame-rate cut of the gemstone fruit. The blade enters smoothly, splitting the crystal structure, revealing liquid light flowing down the facets, satisfying ASMR physics, hyper-detailed rendering.",
  },
  {
    id: "hailuo_minimax",
    name: "Hailuo AI (Minimax Video)",
    description: "Chất lượng vật lý chất lỏng và phản xạ ánh sáng đỉnh cao.",
    defaultParams: "Resolution: 1080p | Subject Consistency: High",
    motionKeywords:
      "Extreme close up macro shot: precision knife cleanly bisects the translucent gem fruit, releasing a thick stream of glowing sparkling nectar that drips in hyper slow motion onto the pedestal, 8k raytracing.",
  },
];

export const GEMINI_MODELS: GeminiModelOption[] = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash (Khuyên dùng)",
    description:
      "Mô hình nhanh nhất, thông minh, tối ưu quota RPM cao, sinh prompt chuẩn xác.",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description:
      "Mô hình cao cấp, tư duy sâu, mô tả chi tiết quang học và kịch bản viral hoàn hảo.",
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    description: "Mô hình thế hệ 2.0 đa năng, tốc độ cực nhanh, ổn định.",
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    description:
      "Mô hình truyền thống với hạn mức token lớn, tương thích rộng rãi.",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    description: "Mô hình 1.5 Pro chi tiết cao.",
  },
  {
    id: "custom",
    name: "Tùy chỉnh mã Model (e.g. 3.7 / 3.6 / Preview)",
    description: "Nhập bất kỳ mã model Gemini nào bạn muốn sử dụng.",
    isCustom: true,
  },
];

export const VIRAL_TITLE_TEMPLATES = [
  "Oddly Satisfying {gemstone} {fruit} Slice ASMR {emoji} 😜 #shorts #asmr",
  "Oddly Satisfying {gemstone} {fruit} Cut ASMR ✨ {emoji} #shorts #satisfying",
  "Would you eat this {gemstone} {fruit}? 🤤💎 #shorts #asmr",
  "Wait for the inside of this {gemstone} {fruit}! 😱✨ #shorts #oddlysatisfying",
  "Satisfying ASMR {gemstone} {fruit} Slicing 💎{emoji} #shorts",
];

export const DEFAULT_HASHTAGS = [
  "#shorts",
  "#satisfying",
  "#oddlysatisfying",
  "#asmr",
  "#asmrsounds",
  "#visualart",
  "#cutting",
  "#feelai",
];
