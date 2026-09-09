import { CorridorSection } from '../types';

export const CORRIDOR_SECTIONS: CorridorSection[] = [
  {
    id: 'NDLS-CNB',
    name: 'New Delhi – Kanpur Central',
    code: 'NDLS-CNB',
    startKm: 0,
    endKm: 440,
    lengthKm: 440,
    tracks: 'Double',
    status: 'Block Planned',
    maxSpeedKmH: 130,
    division: 'Delhi / Prayagraj'
  },
  {
    id: 'CNB-PRYJ',
    name: 'Kanpur Central – Prayagraj Jn',
    code: 'CNB-PRYJ',
    startKm: 440,
    endKm: 634,
    lengthKm: 194,
    tracks: 'Double',
    status: 'Available',
    maxSpeedKmH: 130,
    division: 'Prayagraj'
  },
  {
    id: 'PRYJ-DDU',
    name: 'Prayagraj Jn – Pt. Deen Dayal Upadhyaya',
    code: 'PRYJ-DDU',
    startKm: 634,
    endKm: 787,
    lengthKm: 153,
    tracks: 'Double',
    status: 'Conflict',
    maxSpeedKmH: 130,
    division: 'Pt. Deen Dayal Upadhyaya'
  },
  {
    id: 'DDU-GAYA',
    name: 'Pt. Deen Dayal Upadhyaya – Gaya Jn',
    code: 'DDU-GAYA',
    startKm: 787,
    endKm: 992,
    lengthKm: 205,
    tracks: 'Double',
    status: 'Available',
    maxSpeedKmH: 130,
    division: 'DDU / Danapur'
  },
  {
    id: 'GAYA-DHN',
    name: 'Gaya Jn – Dhanbad Jn (Grand Chord)',
    code: 'GAYA-DHN',
    startKm: 992,
    endKm: 1193,
    lengthKm: 201,
    tracks: 'Double',
    status: 'Block Planned',
    maxSpeedKmH: 130,
    division: 'Dhanbad'
  },
  {
    id: 'DHN-ASN',
    name: 'Dhanbad Jn – Asansol Jn',
    code: 'DHN-ASN',
    startKm: 1193,
    endKm: 1251,
    lengthKm: 58,
    tracks: 'Double',
    status: 'Available',
    maxSpeedKmH: 110,
    division: 'Asansol'
  },
  {
    id: 'ASN-HWH',
    name: 'Asansol Jn – Howrah Jn',
    code: 'ASN-HWH',
    startKm: 1251,
    endKm: 1451,
    lengthKm: 200,
    tracks: 'Quad',
    status: 'Available',
    maxSpeedKmH: 130,
    division: 'Howrah'
  }
];
