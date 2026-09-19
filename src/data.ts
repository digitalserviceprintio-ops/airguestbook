import { Guest, Transaction, WishlistItem, GuestWish, TableAllocation } from './types';

export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'AG-VIP-001',
    name: 'Ir. H. Bambang Soediro, M.M.',
    phone: '+62 812-8899-2311',
    category: 'VVIP Kehormatan',
    table: 'Meja 01 (Utama)',
    pax: 2,
    rsvpStatus: 'Hadir',
    attendanceStatus: 'Sudah Hadir',
    checkInTime: '18:42 WIB',
    souvenirTaken: true,
    souvenirCount: 2,
    envelopeAmount: 2500000,
    paymentMethod: 'QRIS AirGuest',
    avatarInitials: 'BS'
  },
  {
    id: 'AG-FAM-002',
    name: 'Sarah & Rian Pratama',
    phone: 'sarah.pratama@gmail.com',
    category: 'Keluarga Pengantin',
    table: 'Meja 03 (Sayap Barat)',
    pax: 2,
    rsvpStatus: 'Hadir',
    attendanceStatus: 'Sudah Hadir',
    checkInTime: '18:55 WIB',
    souvenirTaken: true,
    souvenirCount: 2,
    envelopeAmount: 1500000,
    paymentMethod: 'Tunai / Titip',
    avatarInitials: 'SP'
  },
  {
    id: 'AG-VIP-003',
    name: 'dr. Hendra Wijaya, Sp.A & Istri',
    phone: '+62 811-9230-104',
    category: 'VIP Sahabat',
    table: 'Meja 05 (Tengah)',
    pax: 1,
    rsvpStatus: 'Hadir',
    attendanceStatus: 'Belum Hadir',
    souvenirTaken: false,
    souvenirCount: 1,
    avatarInitials: 'HW'
  },
  {
    id: 'AG-COL-004',
    name: 'Amanda Putri Jasmine',
    phone: 'amanda.jasmine@techstudio.co.id',
    category: 'Kolega Kantor',
    table: 'Meja 12 (Taman)',
    pax: 1,
    rsvpStatus: 'Hadir',
    attendanceStatus: 'Sudah Hadir',
    checkInTime: '19:10 WIB',
    souvenirTaken: true,
    souvenirCount: 1,
    envelopeAmount: 750000,
    paymentMethod: 'QRIS AirGuest',
    avatarInitials: 'AP'
  },
  {
    id: 'AG-ALU-005',
    name: 'Farhan Maulana & Istri',
    phone: '+62 878-1994-5502',
    category: 'Alumni ITB',
    table: 'Meja 08 (Balkon)',
    pax: 2,
    rsvpStatus: 'Berhalangan',
    attendanceStatus: 'Belum Hadir',
    souvenirTaken: false,
    souvenirCount: 0,
    envelopeAmount: 500000,
    paymentMethod: 'Mandiri',
    avatarInitials: 'FM'
  },
  {
    id: 'AG-VIP-006',
    name: 'Ibu Dewi Wardhana',
    phone: '+62 813-4412-9900',
    category: 'VIP Kolega Orang Tua',
    table: 'Meja 02 (Utama)',
    pax: 2,
    rsvpStatus: 'Hadir',
    attendanceStatus: 'Belum Hadir',
    souvenirTaken: false,
    souvenirCount: 2,
    envelopeAmount: 2000000,
    paymentMethod: 'Tunai / Titip',
    avatarInitials: 'DW'
  },
  {
    id: 'AG-CHK-007',
    name: 'Nadira Prasetya & Suami',
    phone: '+62 815-7721-3990',
    category: 'Sahabat SMA',
    table: 'Meja 09',
    pax: 2,
    rsvpStatus: 'Hadir',
    attendanceStatus: 'Sudah Hadir',
    checkInTime: '19:35 WIB',
    souvenirTaken: true,
    souvenirCount: 2,
    envelopeAmount: 750000,
    paymentMethod: 'QRIS AirGuest',
    avatarInitials: 'NP'
  },
  {
    id: 'AG-CHK-008',
    name: 'Reza Maulana (Groomsmen)',
    phone: '+62 817-6632-1100',
    category: 'Groomsmen',
    table: 'Meja Sahabat Kampus Dimas',
    pax: 1,
    rsvpStatus: 'Hadir',
    attendanceStatus: 'Sudah Hadir',
    checkInTime: '19:35 WIB',
    souvenirTaken: false,
    souvenirCount: 1,
    avatarInitials: 'RM'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-101',
    senderName: 'Nadira Prasetya & Suami',
    relation: 'QRIS AirGuest',
    amount: 750000,
    method: 'QRIS AirGuest',
    timeAgo: '1 menit yang lalu',
    message: 'Selamat menempuh hidup baru Sarah & Dimas! Langgeng dan bahagia selalu!',
    verified: true,
    avatarInitials: 'NP'
  },
  {
    id: 'TRX-102',
    senderName: 'Ir. Bambang Trihatmojo',
    relation: 'BCA VA',
    amount: 2000000,
    method: 'BCA VA',
    timeAgo: '8 menit yang lalu',
    message: 'Semoga menjadi keluarga sakinah mawaddah warahmah untuk ananda berdua.',
    verified: true,
    avatarInitials: 'BT'
  },
  {
    id: 'TRX-103',
    senderName: "Keluarga Besar Alumni ITB '16",
    relation: 'Mandiri',
    amount: 1500000,
    method: 'Mandiri',
    timeAgo: '14 menit yang lalu',
    message: 'Selamat bro Dimas! Jangan lupa hadir reuni akbar tahun depan!',
    verified: true,
    avatarInitials: 'KA'
  },
  {
    id: 'TRX-104',
    senderName: 'Jessica & Reno',
    relation: 'QRIS AirGuest',
    amount: 500000,
    method: 'QRIS AirGuest',
    timeAgo: '22 menit yang lalu',
    message: 'Happy wedding lovely couple! Welcome to the married club!',
    verified: true,
    avatarInitials: 'JR'
  }
];

export const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 'WSH-01',
    name: "De'Longhi Dedica Espresso EC685",
    priceEstimate: 'Rp 3.890.000',
    status: 'Telah Diberikan',
    giver: 'Rian Firmansyah & Maya',
    deliveryNote: 'Tiba di Meja Kado'
  },
  {
    id: 'WSH-02',
    name: 'Philips Air Purifier Series 2000i',
    priceEstimate: 'Rp 4.250.000',
    status: 'Sedang Dikirim',
    deliveryNote: 'Kurir J&T Cargo • Dikirim ke Rumah',
    courier: 'J&T Cargo',
    trackingNo: 'JT892019'
  },
  {
    id: 'WSH-03',
    name: 'Panasonic Inverter Convection Microwave',
    priceEstimate: 'Rp 2.750.000',
    status: 'Masih Tersedia',
    deliveryNote: 'Tamu dapat patungan atau klaim langsung'
  },
  {
    id: 'WSH-04',
    name: 'Tefal Ingenio Titanium Cookware Set',
    priceEstimate: 'Rp 3.200.000',
    status: 'Telah Diberikan',
    giver: 'Tim Kantor Tokopedia Tech',
    deliveryNote: 'Diterima di Venue'
  }
];

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'WSH-D1',
    author: 'dr. Amanda Melati',
    role: 'Sahabat SMA Sarah',
    message: 'Sarah sahabat terbaikku dari zaman putih abu-abu, terharu banget melihat kalian berdua di pelaminan hari ini. Dimas, titip Sarah ya! Berkah selalu pernikahannya!',
    likes: 34,
    giftTag: 'Amplop Terkirim',
    avatarInitials: 'AM',
    avatarBg: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'WSH-D2',
    author: 'Kevin & Clarissa',
    role: 'Rekan Kantor Dimas',
    message: 'Keren banget weddingnya pakai AirGuest touchless! Congrats bro Dimas & Sarah! Semoga segera diberikan momongan yang lucu & rumah tangga selalu diliputi keberkahan!',
    likes: 58,
    giftTag: 'Kado: Tefal Set',
    avatarInitials: 'KC',
    avatarBg: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'WSH-D3',
    author: 'Om Hendra & Tante Dewi',
    role: 'Keluarga Besar Surabaya',
    message: 'Maaf belum bisa hadir langsung dari Jawa Timur nak Sarah & nak Dimas. Doa tulus kami panjatkan dari jauh, semoga menjadi keluarga sakinah nan bahagia!',
    likes: 41,
    giftTag: 'Amplop via Bank BCA',
    avatarInitials: 'HD',
    avatarBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'WSH-D4',
    author: 'Farhan Maulana',
    role: 'Teman Kuliah Dimas',
    message: 'Sah brooo!! Akhirnya penantian panjang berlabuh juga di pelaminan megah ini. Enjoy your honeymoon ke Swiss yaa! See you next week!',
    likes: 62,
    giftTag: 'Amplop via Mandiri',
    avatarInitials: 'FM',
    avatarBg: 'bg-emerald-100 text-emerald-800'
  }
];

export const TABLE_ALLOCATIONS: TableAllocation[] = [
  {
    id: 'T-01',
    name: 'Meja 01 - VVIP Kehormatan',
    capacity: 10,
    occupied: 10,
    note: 'Penuh • 8 Tamu sudah hadir di tempat'
  },
  {
    id: 'T-02',
    name: 'Meja 02 - VIP Kolega Ortu',
    capacity: 10,
    occupied: 8,
    note: '2 Kursi Cadangan Siap Pakai'
  },
  {
    id: 'T-03',
    name: 'Meja 03 - Keluarga Pengantin',
    capacity: 10,
    occupied: 10,
    note: 'Penuh • Seluruh anggota telah check-in'
  },
  {
    id: 'T-04',
    name: 'Meja 04 - Rekan Bisnis',
    capacity: 10,
    occupied: 6,
    note: 'Tersisa 4 kursi kosong'
  }
];
