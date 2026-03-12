import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  // === Page 1: HPL items (empty location = "בכל מקום") ===
  { name: "פורמייקה 305", sku: "3160T", quantity: 140, location: "E8", size: "305" },
  { name: "HPL 12 305*122", sku: "3102", quantity: 27, location: "בכל מקום", size: "305*122" },
  { name: "HPL 3 305*122", sku: "3102", quantity: 320, location: "בכל מקום", size: "305*122" },
  { name: "HPL 6 305*122", sku: "3199", quantity: 25, location: "בכל מקום", size: "305*122" },
  { name: "HPL 6 244*122FR", sku: "3199", quantity: 42, location: "בכל מקום", size: "244*122FR" },
  { name: "HPL 19 305*122", sku: "3102MAT", quantity: 1, location: "בכל מקום", size: "305*122" },
  { name: "HPL 19 244*122", sku: "3102TAP", quantity: 18, location: "בכל מקום", size: "244*122" },
  { name: "HPL 3 244*122", sku: "3102", quantity: 100, location: "בכל מקום", size: "244*122" },
  { name: "HPL 6 244*122FR", sku: "3102", quantity: 360, location: "בכל מקום", size: "244*122FR" },
  { name: "HPL 6 244*122", sku: "3102", quantity: 200, location: "בכל מקום", size: "244*122" },
  { name: "HPL 12 244*122", sku: "3102", quantity: 40, location: "בכל מקום", size: "244*122" },

  // === Page 2: פורמייקה 244 + 305 items ===
  { name: "פורמייקה 244", sku: "0561FC", quantity: 4, location: "E1", size: "244" },
  { name: "פורמייקה 244", sku: "NICKEL", quantity: 13, location: "B8", size: "244" },
  { name: "פורמייקה 244", sku: "1425FT", quantity: 36, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "3100F", quantity: 10, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "5550", quantity: 2, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "2030MT", quantity: 5, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "3623MT", quantity: 8, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "2020G", quantity: 17, location: "J", size: "244" },
  { name: "פורמייקה 244", sku: "2114", quantity: 3, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "1423", quantity: 1, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "1100AL", quantity: 3, location: "A7", size: "244" },
  { name: "פורמייקה 244", sku: "5182", quantity: 4, location: "B3", size: "244" },
  { name: "פורמייקה 244 נלהיום שחור", sku: "לא ברור", quantity: 6, location: "G6-7", size: "244" },
  { name: "פורמייקה 244", sku: "RIGHT GOL", quantity: 2, location: "G7", size: "244" },
  { name: "פורמייקה 244", sku: "BRIGHT ALE", quantity: 140, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "7663A", quantity: 26, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "933LL", quantity: 7, location: "C8", size: "244" },
  { name: "פורמייקה 305 גב", sku: "גב.", quantity: 470, location: "C8", size: "305" },
  { name: "פורמייקה 305", sku: "3100T", quantity: 310, location: "C6", size: "305" },
  { name: "פורמייקה 305", sku: "3199T", quantity: 150, location: "D4", size: "305" },
  { name: "פורמייקה 305", sku: "3130", quantity: 5, location: "C8", size: "305" },

  // === Page 3: פורמייקה 244 items ===
  { name: "פורמייקה 244", sku: "3100MAT", quantity: 420, location: "J4", size: "244" },
  { name: "פורמייקה 244", sku: "3234TF", quantity: 1, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "3228TF", quantity: 6, location: "F9", size: "244" },
  { name: "פורמייקה 244", sku: "3227TF", quantity: 9, location: "A0", size: "244" },
  { name: "פורמייקה 244", sku: "3207TF", quantity: 20, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "2700", quantity: 33, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "2680", quantity: 8, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "5561F", quantity: 4, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "5602M", quantity: 3, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "5609F", quantity: 9, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "5645F", quantity: 24, location: "B12", size: "244" },
  { name: "פורמייקה 244", sku: "3201", quantity: 0, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "2114", quantity: 3, location: "B13", size: "244" },
  { name: "פורמייקה 244", sku: "5651", quantity: 9, location: "B11", size: "244" },
  { name: "פורמייקה 244", sku: "5660", quantity: 4, location: "B17", size: "244" },
  { name: "פורמייקה 244", sku: "5730", quantity: 3, location: "B16", size: "244" },
  { name: "פורמייקה 244", sku: "5731", quantity: 13, location: "B19", size: "244" },
  { name: "פורמייקה 244", sku: "5732", quantity: 23, location: "B20", size: "244" },
  { name: "פורמייקה 244", sku: "5733", quantity: 6, location: "E11", size: "244" },
  { name: "פורמייקה 244", sku: "1416", quantity: 8, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "2810", quantity: 16, location: "לא ברור", size: "244" },

  // === Page 4: פורמייקה 244 items ===
  { name: "פורמייקה 244", sku: "3199MT", quantity: 26, location: "B9", size: "244" },
  { name: "פורמייקה 244", sku: "5525MT", quantity: 13, location: "B10", size: "244" },
  { name: "פורמייקה 244", sku: "3199G", quantity: 740, location: "E7+8", size: "244" },
  { name: "פורמייקה 244", sku: "609MT", quantity: 7, location: "B9", size: "244" },
  { name: "פורמייקה 244", sku: "1000", quantity: 700, location: "F1+G10", size: "244" },
  { name: "פורמייקה 244", sku: "8801MT", quantity: 6, location: "B16", size: "244" },
  { name: "פורמייקה 244", sku: "3814T", quantity: 5, location: "B2", size: "244" },
  { name: "פורמייקה 244 ALFANDARI", sku: "3100G", quantity: 420, location: "H4", size: "244" },
  { name: "פורמייקה 244", sku: "5986TM", quantity: 13, location: "B14", size: "244" },
  { name: "פורמייקה 244", sku: "5950TM", quantity: 0, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "3164TF", quantity: 0, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "2170TF", quantity: 18, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "3728TF", quantity: 14, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "3718TF", quantity: 5, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "3187TF", quantity: 0, location: "-", size: "244" },
  { name: "פורמייקה 244 ALFANDARI", sku: "3199TAB", quantity: 900, location: "G3", size: "244" },
  { name: "פורמייקה 244", sku: "3949TF", quantity: 0, location: "-", size: "244" },
  { name: "פורמייקה 244", sku: "1067TF", quantity: 0, location: "-", size: "244" },

  // === Page 5: פורמייקה 244 items ===
  { name: "פורמייקה 244 0.9 גב", sku: "0.9 גב", quantity: 1600, location: "H4", size: "244" },
  { name: "פורמייקה 244", sku: "3199MAT", quantity: 450, location: "J8", size: "244" },
  { name: "פורמייקה 244", sku: "3100T", quantity: 2100, location: "L2", size: "244" },
  { name: "פורמייקה 244", sku: "1020G", quantity: 9, location: "A3", size: "244" },
  { name: "פורמייקה 244", sku: "1078G", quantity: 18, location: "A4", size: "244" },
  { name: "פורמייקה 244", sku: "1407G", quantity: 6, location: "A2", size: "244" },
  { name: "פורמייקה 244", sku: "1409G", quantity: 13, location: "A7", size: "244" },
  { name: "פורמייקה 244", sku: "1411G", quantity: 14, location: "A8", size: "244" },
  { name: "פורמייקה 244", sku: "2047G", quantity: 30, location: "A9", size: "244" },
  { name: "פורמייקה 244", sku: "2100G", quantity: 30, location: "A10", size: "244" },
  { name: "פורמייקה 244", sku: "2102G", quantity: 14, location: "A11", size: "244" },
  { name: "פורמייקה 244", sku: "3170T", quantity: 5, location: "A12", size: "244" },
  { name: "פורמייקה 244", sku: "3109G", quantity: 17, location: "A13", size: "244" },
  { name: "פורמייקה 244", sku: "2110G", quantity: 20, location: "A14", size: "244" },
  { name: "פורמייקה 244", sku: "2112G", quantity: 12, location: "A15", size: "244" },
  { name: "פורמייקה 244", sku: "1077T", quantity: 8, location: "A17", size: "244" },
  { name: "פורמייקה 244", sku: "1078T", quantity: 24, location: "A18", size: "244" },
  { name: "פורמייקה 244", sku: "3156T", quantity: 25, location: "A19", size: "244" },
  { name: "פורמייקה 244", sku: "5339T", quantity: 25, location: "B6", size: "244" },
  { name: "פורמייקה 244", sku: "113MT", quantity: 12, location: "B7", size: "244" },
  { name: "פורמייקה 244", sku: "1240MT", quantity: 0, location: "לא ברור", size: "244" },

  // === Page 6: פורמייקה 305 + 244 items ===
  { name: "פורמייקה 305", sku: "2408SMT", quantity: 80, location: "D8", size: "305" },
  { name: "פורמייקה 305", sku: "4006TC", quantity: 70, location: "D5", size: "305" },
  { name: "פורמייקה 305", sku: "2603NV", quantity: 190, location: "C10", size: "305" },
  { name: "פורמייקה 305", sku: "2963NV", quantity: 74, location: "C3", size: "305" },
  { name: "פורמייקה 305", sku: "4663DM", quantity: 90, location: "C5", size: "305" },
  { name: "פורמייקה 305", sku: "2400NV", quantity: 90, location: "C3", size: "305" },
  { name: "פורמייקה 305", sku: "4901NV", quantity: 67, location: "D6", size: "305" },
  { name: "פורמייקה 305", sku: "2602NV", quantity: 78, location: "D7", size: "305" },
  { name: "פורמייקה 305", sku: "2409SMT", quantity: 92, location: "G11", size: "305" },
  { name: "פורמייקה 244", sku: "2332CN", quantity: 90, location: "G9", size: "244" },
  { name: "פורמייקה 244", sku: "2879CN", quantity: 66, location: "F4", size: "244" },
  { name: "פורמייקה 244", sku: "2629TAP", quantity: 102, location: "E3", size: "244" },
  { name: "פורמייקה 244", sku: "3199TO", quantity: 55, location: "E4", size: "244" },
  { name: "פורמייקה 244", sku: "3409", quantity: 700, location: "F3", size: "244" },
  { name: "פורמייקה 244", sku: "3130", quantity: 800, location: "DGen", size: "244" },
  { name: "פורמייקה 244", sku: "1610T", quantity: 700, location: "H4+5", size: "244" },
  { name: "פורמייקה 244", sku: "3102", quantity: 700, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "7020", quantity: 600, location: "F6", size: "244" },
  { name: "פורמייקה 244", sku: "3160", quantity: 1200, location: "F7", size: "244" },
  { name: "פורמייקה 244 0.6 גב", sku: "0.6 גב", quantity: 4000, location: "H4", size: "244" },

  // === Page 7: פורמייקה 244 + 305 items ===
  { name: "פורמייקה 244", sku: "2245TAP", quantity: 96, location: "I5", size: "244" },
  { name: "פורמייקה 244", sku: "3088TAP", quantity: 100, location: "I4", size: "244" },
  { name: "פורמייקה 244", sku: "3507TAP", quantity: 80, location: "I4", size: "244" },
  { name: "פורמייקה 244", sku: "2941TAP", quantity: 11, location: "I6", size: "244" },
  { name: "פורמייקה 244", sku: "3083TAP", quantity: 70, location: "I3", size: "244" },
  { name: "פורמייקה 244", sku: "3038TAP", quantity: 90, location: "I2", size: "244" },
  { name: "פורמייקה 244", sku: "3025TAP", quantity: 102, location: "I1", size: "244" },
  { name: "פורמייקה 244", sku: "3785TAP", quantity: 86, location: "G5", size: "244" },
  { name: "פורמייקה 244", sku: "4434JW", quantity: 75, location: "I10", size: "244" },
  { name: "פורמייקה 244", sku: "4823JW", quantity: 88, location: "H8", size: "244" },
  { name: "פורמייקה 244", sku: "4150SC", quantity: 8, location: "E8", size: "244" },
  { name: "פורמייקה 244", sku: "7020JW", quantity: 74, location: "G15", size: "244" },
  { name: "פורמייקה 244", sku: "4877ST", quantity: 90, location: "F5", size: "244" },
  { name: "פורמייקה 244", sku: "4149SC", quantity: 82, location: "G4", size: "244" },
  { name: "פורמייקה 244", sku: "4682CN", quantity: 88, location: "G2", size: "244" },
  { name: "פורמייקה 244", sku: "4971PA", quantity: 72, location: "G1", size: "244" },
  { name: "פורמייקה 244", sku: "4801BSN", quantity: 95, location: "לא ברור", size: "244" },
  { name: "פורמייקה 244", sku: "4503CN", quantity: 80, location: "F2", size: "244" },
  { name: "פורמייקה 305", sku: "4805GO", quantity: 83, location: "D10", size: "305" },
  { name: "פורמייקה 305", sku: "2754NV", quantity: 81, location: "D9", size: "305" },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.inventory.deleteMany();

  // Insert all items
  for (const item of items) {
    await prisma.inventory.create({ data: item });
  }

  console.log(`Seeded ${items.length} items`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
