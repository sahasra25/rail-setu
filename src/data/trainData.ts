import { Train } from '../types';

export const SAMPLE_TRAINS: Train[] = [
  {
    id: 't-12301',
    number: '12301',
    name: 'Howrah Rajdhani Express',
    type: 'Rajdhani',
    priority: 'Super-Priority',
    origin: 'HWH (Howrah)',
    destination: 'NDLS (New Delhi)',
    scheduledDeparture: '16:50',
    scheduledArrival: '10:05',
    currentSection: 'CNB-PRYJ',
    delayMinutes: 12,
    nextStation: 'Kanpur Central (CNB)',
    nextStationETA: '04:52',
    direction: 'UP',
    color: '#EF4444',
    stops: [
      { station: 'HWH', stationName: 'Howrah Jn', arr: '16:50', dep: '16:50', arrMinutes: 1010, depMinutes: 1010, dayOffset: 0 },
      { station: 'ASN', stationName: 'Asansol Jn', arr: '18:57', dep: '19:00', arrMinutes: 1137, depMinutes: 1140, dayOffset: 0 },
      { station: 'DHN', stationName: 'Dhanbad Jn', arr: '19:55', dep: '20:00', arrMinutes: 1195, depMinutes: 1200, dayOffset: 0 },
      { station: 'GAYA', stationName: 'Gaya Jn', arr: '22:19', dep: '22:22', arrMinutes: 1339, depMinutes: 1342, dayOffset: 0 },
      { station: 'DDU', stationName: 'Pt. Deen Dayal Upadhyaya', arr: '00:45', dep: '00:55', arrMinutes: 45, depMinutes: 55, dayOffset: 1 },
      { station: 'PRYJ', stationName: 'Prayagraj Jn', arr: '02:33', dep: '02:35', arrMinutes: 153, depMinutes: 155, dayOffset: 1 },
      { station: 'CNB', stationName: 'Kanpur Central', arr: '04:40', dep: '04:45', arrMinutes: 280, depMinutes: 285, dayOffset: 1 },
      { station: 'NDLS', stationName: 'New Delhi', arr: '10:05', dep: '10:05', arrMinutes: 605, depMinutes: 605, dayOffset: 1 }
    ],
    sectionOccupancies: [
      { sectionId: 'ASN-HWH', entryMinute: 1010, exitMinute: 1137 },
      { sectionId: 'DHN-ASN', entryMinute: 1140, exitMinute: 1195 },
      { sectionId: 'GAYA-DHN', entryMinute: 1200, exitMinute: 1339 },
      { sectionId: 'DDU-GAYA', entryMinute: 1342, exitMinute: 1440 }, // into next day
      { sectionId: 'PRYJ-DDU', entryMinute: 55, exitMinute: 153 },
      { sectionId: 'CNB-PRYJ', entryMinute: 155, exitMinute: 280 },
      { sectionId: 'NDLS-CNB', entryMinute: 285, exitMinute: 605 }
    ]
  },
  {
    id: 't-22436',
    number: '22436',
    name: 'Vande Bharat Express',
    type: 'Vande Bharat',
    priority: 'High',
    origin: 'NDLS (New Delhi)',
    destination: 'BSB (Varanasi)',
    scheduledDeparture: '06:00',
    scheduledArrival: '14:00',
    currentSection: 'NDLS-CNB',
    delayMinutes: 0,
    nextStation: 'Kanpur Central (CNB)',
    nextStationETA: '10:08',
    direction: 'DOWN',
    color: '#3B82F6',
    stops: [
      { station: 'NDLS', stationName: 'New Delhi', arr: '06:00', dep: '06:00', arrMinutes: 360, depMinutes: 360, dayOffset: 0 },
      { station: 'CNB', stationName: 'Kanpur Central', arr: '10:08', dep: '10:10', arrMinutes: 608, depMinutes: 610, dayOffset: 0 },
      { station: 'PRYJ', stationName: 'Prayagraj Jn', arr: '12:08', dep: '12:10', arrMinutes: 728, depMinutes: 730, dayOffset: 0 },
      { station: 'BSB', stationName: 'Varanasi Jn', arr: '14:00', dep: '14:00', arrMinutes: 840, depMinutes: 840, dayOffset: 0 }
    ],
    sectionOccupancies: [
      { sectionId: 'NDLS-CNB', entryMinute: 360, exitMinute: 608 },
      { sectionId: 'CNB-PRYJ', entryMinute: 610, exitMinute: 728 },
      { sectionId: 'PRYJ-DDU', entryMinute: 730, exitMinute: 830 }
    ]
  },
  {
    id: 't-12302',
    number: '12302',
    name: 'New Delhi – Howrah Rajdhani',
    type: 'Rajdhani',
    priority: 'Super-Priority',
    origin: 'NDLS (New Delhi)',
    destination: 'HWH (Howrah)',
    scheduledDeparture: '16:55',
    scheduledArrival: '09:55',
    currentSection: 'NDLS-CNB',
    delayMinutes: 5,
    nextStation: 'Kanpur Central (CNB)',
    nextStationETA: '21:35',
    direction: 'DOWN',
    color: '#EF4444',
    stops: [
      { station: 'NDLS', stationName: 'New Delhi', arr: '16:55', dep: '16:55', arrMinutes: 1015, depMinutes: 1015, dayOffset: 0 },
      { station: 'CNB', stationName: 'Kanpur Central', arr: '21:30', dep: '21:35', arrMinutes: 1290, depMinutes: 1295, dayOffset: 0 },
      { station: 'PRYJ', stationName: 'Prayagraj Jn', arr: '23:35', dep: '23:37', arrMinutes: 1415, depMinutes: 1417, dayOffset: 0 },
      { station: 'DDU', stationName: 'Pt. Deen Dayal Upadhyaya', arr: '01:37', dep: '01:47', arrMinutes: 97, depMinutes: 107, dayOffset: 1 },
      { station: 'GAYA', stationName: 'Gaya Jn', arr: '03:55', dep: '03:58', arrMinutes: 235, depMinutes: 238, dayOffset: 1 },
      { station: 'DHN', stationName: 'Dhanbad Jn', arr: '06:18', dep: '06:23', arrMinutes: 378, depMinutes: 383, dayOffset: 1 },
      { station: 'ASN', stationName: 'Asansol Jn', arr: '07:11', dep: '07:13', arrMinutes: 431, depMinutes: 433, dayOffset: 1 },
      { station: 'HWH', stationName: 'Howrah Jn', arr: '09:55', dep: '09:55', arrMinutes: 595, depMinutes: 595, dayOffset: 1 }
    ],
    sectionOccupancies: [
      { sectionId: 'NDLS-CNB', entryMinute: 1015, exitMinute: 1290 },
      { sectionId: 'CNB-PRYJ', entryMinute: 1295, exitMinute: 1415 },
      { sectionId: 'PRYJ-DDU', entryMinute: 1417, exitMinute: 1440 },
      { sectionId: 'DDU-GAYA', entryMinute: 107, exitMinute: 235 },
      { sectionId: 'GAYA-DHN', entryMinute: 238, exitMinute: 378 },
      { sectionId: 'DHN-ASN', entryMinute: 383, exitMinute: 431 },
      { sectionId: 'ASN-HWH', entryMinute: 433, exitMinute: 595 }
    ]
  },
  {
    id: 't-12273',
    number: '12273',
    name: 'Howrah Duronto Express',
    type: 'Duronto',
    priority: 'High',
    origin: 'HWH (Howrah)',
    destination: 'NDLS (New Delhi)',
    scheduledDeparture: '08:35',
    scheduledArrival: '06:25',
    currentSection: 'GAYA-DHN',
    delayMinutes: 18,
    nextStation: 'Gaya Jn (GAYA)',
    nextStationETA: '14:20',
    direction: 'UP',
    color: '#8B5CF6',
    stops: [
      { station: 'HWH', stationName: 'Howrah Jn', arr: '08:35', dep: '08:35', arrMinutes: 515, depMinutes: 515, dayOffset: 0 },
      { station: 'ASN', stationName: 'Asansol Jn', arr: '10:55', dep: '11:00', arrMinutes: 655, depMinutes: 660, dayOffset: 0 },
      { station: 'DHN', stationName: 'Dhanbad Jn', arr: '12:00', dep: '12:05', arrMinutes: 720, depMinutes: 725, dayOffset: 0 },
      { station: 'GAYA', stationName: 'Gaya Jn', arr: '14:02', dep: '14:07', arrMinutes: 842, depMinutes: 847, dayOffset: 0 },
      { station: 'DDU', stationName: 'Pt. Deen Dayal Upadhyaya', arr: '16:30', dep: '16:40', arrMinutes: 990, depMinutes: 1000, dayOffset: 0 },
      { station: 'CNB', stationName: 'Kanpur Central', arr: '21:10', dep: '21:15', arrMinutes: 1270, depMinutes: 1275, dayOffset: 0 },
      { station: 'NDLS', stationName: 'New Delhi', arr: '06:25', dep: '06:25', arrMinutes: 385, depMinutes: 385, dayOffset: 1 }
    ],
    sectionOccupancies: [
      { sectionId: 'ASN-HWH', entryMinute: 515, exitMinute: 655 },
      { sectionId: 'DHN-ASN', entryMinute: 660, exitMinute: 720 },
      { sectionId: 'GAYA-DHN', entryMinute: 725, exitMinute: 842 },
      { sectionId: 'DDU-GAYA', entryMinute: 847, exitMinute: 990 },
      { sectionId: 'PRYJ-DDU', entryMinute: 1000, exitMinute: 1140 },
      { sectionId: 'CNB-PRYJ', entryMinute: 1140, exitMinute: 1270 },
      { sectionId: 'NDLS-CNB', entryMinute: 1275, exitMinute: 1440 }
    ]
  },
  {
    id: 't-12311',
    number: '12311',
    name: 'Netaji Express',
    type: 'Mail/Express',
    priority: 'Normal',
    origin: 'HWH (Howrah)',
    destination: 'KLK (Kalka)',
    scheduledDeparture: '21:55',
    scheduledArrival: '03:00',
    currentSection: 'PRYJ-DDU',
    delayMinutes: 35,
    nextStation: 'Prayagraj Jn (PRYJ)',
    nextStationETA: '10:45',
    direction: 'UP',
    color: '#06B6D4',
    stops: [
      { station: 'HWH', stationName: 'Howrah Jn', arr: '21:55', dep: '21:55', arrMinutes: 1315, depMinutes: 1315, dayOffset: 0 },
      { station: 'ASN', stationName: 'Asansol Jn', arr: '01:00', dep: '01:05', arrMinutes: 60, depMinutes: 65, dayOffset: 1 },
      { station: 'DHN', stationName: 'Dhanbad Jn', arr: '02:15', dep: '02:20', arrMinutes: 135, depMinutes: 140, dayOffset: 1 },
      { station: 'GAYA', stationName: 'Gaya Jn', arr: '05:05', dep: '05:10', arrMinutes: 305, depMinutes: 310, dayOffset: 1 },
      { station: 'DDU', stationName: 'Pt. Deen Dayal Upadhyaya', arr: '08:05', dep: '08:15', arrMinutes: 485, depMinutes: 495, dayOffset: 1 },
      { station: 'PRYJ', stationName: 'Prayagraj Jn', arr: '10:10', dep: '10:20', arrMinutes: 610, depMinutes: 620, dayOffset: 1 },
      { station: 'CNB', stationName: 'Kanpur Central', arr: '13:30', dep: '13:40', arrMinutes: 810, depMinutes: 820, dayOffset: 1 },
      { station: 'NDLS', stationName: 'Delhi Jn', arr: '20:55', dep: '21:10', arrMinutes: 1255, depMinutes: 1270, dayOffset: 1 }
    ],
    sectionOccupancies: [
      { sectionId: 'ASN-HWH', entryMinute: 1315, exitMinute: 1440 },
      { sectionId: 'DHN-ASN', entryMinute: 65, exitMinute: 135 },
      { sectionId: 'GAYA-DHN', entryMinute: 140, exitMinute: 305 },
      { sectionId: 'DDU-GAYA', entryMinute: 310, exitMinute: 485 },
      { sectionId: 'PRYJ-DDU', entryMinute: 495, exitMinute: 610 },
      { sectionId: 'CNB-PRYJ', entryMinute: 620, exitMinute: 810 },
      { sectionId: 'NDLS-CNB', entryMinute: 820, exitMinute: 1255 }
    ]
  },
  {
    id: 't-12801',
    number: '12801',
    name: 'Purushottam Express',
    type: 'Mail/Express',
    priority: 'Normal',
    origin: 'PURI (Puri)',
    destination: 'NDLS (New Delhi)',
    scheduledDeparture: '21:55',
    scheduledArrival: '04:00',
    currentSection: 'DHN-ASN',
    delayMinutes: 8,
    nextStation: 'Dhanbad Jn (DHN)',
    nextStationETA: '10:50',
    direction: 'UP',
    color: '#10B981',
    stops: [
      { station: 'ASN', stationName: 'Asansol Jn', arr: '09:40', dep: '09:45', arrMinutes: 580, depMinutes: 585, dayOffset: 1 },
      { station: 'DHN', stationName: 'Dhanbad Jn', arr: '10:45', dep: '10:50', arrMinutes: 645, depMinutes: 650, dayOffset: 1 },
      { station: 'GAYA', stationName: 'Gaya Jn', arr: '13:40', dep: '13:45', arrMinutes: 820, depMinutes: 825, dayOffset: 1 },
      { station: 'DDU', stationName: 'Pt. Deen Dayal Upadhyaya', arr: '16:50', dep: '17:00', arrMinutes: 1010, depMinutes: 1020, dayOffset: 1 },
      { station: 'PRYJ', stationName: 'Prayagraj Jn', arr: '19:20', dep: '19:30', arrMinutes: 1160, depMinutes: 1170, dayOffset: 1 },
      { station: 'CNB', stationName: 'Kanpur Central', arr: '21:55', dep: '22:00', arrMinutes: 1315, depMinutes: 1320, dayOffset: 1 },
      { station: 'NDLS', stationName: 'New Delhi', arr: '04:00', dep: '04:00', arrMinutes: 240, depMinutes: 240, dayOffset: 2 }
    ],
    sectionOccupancies: [
      { sectionId: 'ASN-HWH', entryMinute: 450, exitMinute: 580 },
      { sectionId: 'DHN-ASN', entryMinute: 585, exitMinute: 645 },
      { sectionId: 'GAYA-DHN', entryMinute: 650, exitMinute: 820 },
      { sectionId: 'DDU-GAYA', entryMinute: 825, exitMinute: 1010 },
      { sectionId: 'PRYJ-DDU', entryMinute: 1020, exitMinute: 1160 },
      { sectionId: 'CNB-PRYJ', entryMinute: 1170, exitMinute: 1315 },
      { sectionId: 'NDLS-CNB', entryMinute: 1320, exitMinute: 1440 }
    ]
  },
  {
    id: 't-boxn8812',
    number: 'BOXN-8812',
    name: 'Coal Heavy Freight (Dhanbad-Dadri)',
    type: 'Freight',
    priority: 'Freight',
    origin: 'DHN (Dhanbad Coalfield)',
    destination: 'DER (Dadri Powerhouse)',
    scheduledDeparture: '02:00',
    scheduledArrival: '23:00',
    currentSection: 'DDU-GAYA',
    delayMinutes: 45,
    nextStation: 'Pt. Deen Dayal Upadhyaya (DDU)',
    nextStationETA: '11:15',
    direction: 'UP',
    color: '#64748B',
    stops: [
      { station: 'DHN', stationName: 'Dhanbad Goods Yard', arr: '02:00', dep: '02:00', arrMinutes: 120, depMinutes: 120, dayOffset: 0 },
      { station: 'GAYA', stationName: 'Gaya Bypass Yard', arr: '06:00', dep: '06:30', arrMinutes: 360, depMinutes: 390, dayOffset: 0 },
      { station: 'DDU', stationName: 'DDU Marshalling Yard', arr: '10:30', dep: '11:30', arrMinutes: 630, depMinutes: 690, dayOffset: 0 },
      { station: 'PRYJ', stationName: 'Subedarganj Yard', arr: '15:00', dep: '15:30', arrMinutes: 900, depMinutes: 930, dayOffset: 0 },
      { station: 'CNB', stationName: 'Juhi Marshalling Yard', arr: '18:30', dep: '19:00', arrMinutes: 1110, depMinutes: 1140, dayOffset: 0 },
      { station: 'NDLS', stationName: 'Dadri DFC Yard', arr: '23:00', dep: '23:00', arrMinutes: 1380, depMinutes: 1380, dayOffset: 0 }
    ],
    sectionOccupancies: [
      { sectionId: 'GAYA-DHN', entryMinute: 120, exitMinute: 360 },
      { sectionId: 'DDU-GAYA', entryMinute: 390, exitMinute: 630 },
      { sectionId: 'PRYJ-DDU', entryMinute: 690, exitMinute: 900 },
      { sectionId: 'CNB-PRYJ', entryMinute: 930, exitMinute: 1110 },
      { sectionId: 'NDLS-CNB', entryMinute: 1140, exitMinute: 1380 }
    ]
  },
  {
    id: 't-bcn4402',
    number: 'BCN-4402',
    name: 'Fertilizer & Grain Freight Rake',
    type: 'Freight',
    priority: 'Freight',
    origin: 'CNB (Kanpur Goods Shed)',
    destination: 'ASN (Asansol Goods Depot)',
    scheduledDeparture: '04:30',
    scheduledArrival: '22:00',
    currentSection: 'CNB-PRYJ',
    delayMinutes: 20,
    nextStation: 'Prayagraj Chheoki (PCOI)',
    nextStationETA: '11:30',
    direction: 'DOWN',
    color: '#64748B',
    stops: [
      { station: 'CNB', stationName: 'Kanpur Goods', arr: '04:30', dep: '04:30', arrMinutes: 270, depMinutes: 270, dayOffset: 0 },
      { station: 'PRYJ', stationName: 'Prayagraj Chheoki', arr: '08:00', dep: '08:30', arrMinutes: 480, depMinutes: 510, dayOffset: 0 },
      { station: 'DDU', stationName: 'DDU Goods', arr: '12:00', dep: '13:00', arrMinutes: 720, depMinutes: 780, dayOffset: 0 },
      { station: 'GAYA', stationName: 'Gaya Yard', arr: '16:00', dep: '16:30', arrMinutes: 960, depMinutes: 990, dayOffset: 0 },
      { station: 'ASN', stationName: 'Asansol Goods', arr: '22:00', dep: '22:00', arrMinutes: 1320, depMinutes: 1320, dayOffset: 0 }
    ],
    sectionOccupancies: [
      { sectionId: 'CNB-PRYJ', entryMinute: 270, exitMinute: 480 },
      { sectionId: 'PRYJ-DDU', entryMinute: 510, exitMinute: 720 },
      { sectionId: 'DDU-GAYA', entryMinute: 780, exitMinute: 960 },
      { sectionId: 'GAYA-DHN', entryMinute: 990, exitMinute: 1180 },
      { sectionId: 'DHN-ASN', entryMinute: 1180, exitMinute: 1320 }
    ]
  }
];
