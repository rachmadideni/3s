import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import config from '../config';
import _ from 'lodash';
var NumberFormat = require('react-number-format');



let pendapatan = [
  {
    "NO": "0",
    "IDACCT": 531,
    "KDACCT": "410-001    ",
    "NMACCI": "PENDAPATAN HAULING",
    "FLACCT": "K",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": "40752872133.8100",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "40752872133.8100"
  },
  {
    "NO": "1",
    "IDACCT": 323,
    "KDACCT": "420-001    ",
    "NMACCI": "PENDAPATAN PROYEK H RIDWAN",
    "FLACCT": "K",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "2",
    "IDACCT": 325,
    "KDACCT": "420-002    ",
    "NMACCI": "POTONGAN PENJUALAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  }
];

let biaya = [
  {
    "NO": "0",
    "IDACCT": 326,
    "KDACCT": "510-001    ",
    "NMACCI": "BEBAN PEMAKAIAN SPAREPART",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "3224361384.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "3224361384.0000"
  },
  {
    "NO": "1",
    "IDACCT": 327,
    "KDACCT": "510-002    ",
    "NMACCI": "BEBAN PEMAKAIAN TYRE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "2411607000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "2411607000.0000"
  },
  {
    "NO": "2",
    "IDACCT": 328,
    "KDACCT": "510-003    ",
    "NMACCI": "BEBAN PEMAKAIAN FUEL",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "8106299810.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "8106299810.0000"
  },
  {
    "NO": "3",
    "IDACCT": 329,
    "KDACCT": "510-004    ",
    "NMACCI": "BEBAN PEMAKAIAN OIL",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "330786182.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "330786182.0000"
  },
  {
    "NO": "4",
    "IDACCT": 330,
    "KDACCT": "510-005    ",
    "NMACCI": "BEBAN PEMAKAIAN SPAREPART CONSUMABLE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "1355378303.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "1355378303.0000"
  },
  {
    "NO": "5",
    "IDACCT": 331,
    "KDACCT": "510-006    ",
    "NMACCI": "BEBAN OVERHEAD DAN ASURANSI ASET",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "6",
    "IDACCT": 336,
    "KDACCT": "510-007    ",
    "NMACCI": "BIAYA PENGIRIMAN SPAREPART & TYRE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "402847512.0000",
    "SALDOK": "2800000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "400047512.0000"
  },
  {
    "NO": "7",
    "IDACCT": 337,
    "KDACCT": "510-008    ",
    "NMACCI": "POTONGAN PEMBELIAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "8",
    "IDACCT": 459,
    "KDACCT": "510-009    ",
    "NMACCI": "BIAYA TENAGA KERJA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "8349942912.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "8349942912.0000"
  },
  {
    "NO": "9",
    "IDACCT": 348,
    "KDACCT": "510-010    ",
    "NMACCI": "KONSUMSI ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "2855319360.0000",
    "SALDOK": "12695600.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "2842623760.0000"
  },
  {
    "NO": "10",
    "IDACCT": 575,
    "KDACCT": "510-014    ",
    "NMACCI": "BEBAN PEMAKAIAN TOOLS DAN PERLENGKAPAN SAFETY",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "484000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "484000.0000"
  },
  {
    "NO": "11",
    "IDACCT": 1583,
    "KDACCT": "510-015    ",
    "NMACCI": "BIAYA PERBAIKAN & PEMELIHARAAN SPAREPART",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "189692000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "189692000.0000"
  },
  {
    "NO": "12",
    "IDACCT": 1589,
    "KDACCT": "510-016    ",
    "NMACCI": "BEBAN PERSEDIAAN OBAT ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "25410600.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "25410600.0000"
  },
  {
    "NO": "13",
    "IDACCT": 1619,
    "KDACCT": "510-017    ",
    "NMACCI": "BIAYA SAFETY ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "30574800.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "30574800.0000"
  },
  {
    "NO": "14",
    "IDACCT": 341,
    "KDACCT": "520-001    ",
    "NMACCI": "BIAYA PROMOSI / KEMITRAAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "15",
    "IDACCT": 487,
    "KDACCT": "520-002    ",
    "NMACCI": "INSENTIF PEMASARAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "16",
    "IDACCT": 349,
    "KDACCT": "530-002    ",
    "NMACCI": "HANDLING FEE BBM PROYEK DI PT PERTAMINA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "17",
    "IDACCT": 350,
    "KDACCT": "530-003    ",
    "NMACCI": "PBBKB ATAS BBM HAULING DI PT PERTAMINA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "18",
    "IDACCT": 351,
    "KDACCT": "530-004    ",
    "NMACCI": "BIAYA PROYEK H RIDWAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "19",
    "IDACCT": 352,
    "KDACCT": "530-005    ",
    "NMACCI": "PPH ATAS BBM HAULING DI PT PERTAMINA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "20",
    "IDACCT": 353,
    "KDACCT": "660-001    ",
    "NMACCI": "BIAYA GAJI DAN UPAH",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "6399888160.0000",
    "SALDOK": "1378348.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "6398509812.0000"
  },
  {
    "NO": "21",
    "IDACCT": 354,
    "KDACCT": "660-002    ",
    "NMACCI": "TRANSPORT DAN AKOMODASI KARYAWAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "498879276.0000",
    "SALDOK": "1681000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "497198276.0000"
  },
  {
    "NO": "22",
    "IDACCT": 355,
    "KDACCT": "660-003    ",
    "NMACCI": "TUNJANGAN DAN PESANGON",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "740227330.0000",
    "SALDOK": "1250000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "738977330.0000"
  },
  {
    "NO": "23",
    "IDACCT": 356,
    "KDACCT": "660-004    ",
    "NMACCI": "BIAYA BBM",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "17429500.0000",
    "SALDOK": "102500.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "17327000.0000"
  },
  {
    "NO": "24",
    "IDACCT": 357,
    "KDACCT": "660-005    ",
    "NMACCI": "BIAYA RETRIBUSI, PARKIR DAN TOL",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "4288500.0000",
    "SALDOK": "10000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "4278500.0000"
  },
  {
    "NO": "25",
    "IDACCT": 358,
    "KDACCT": "660-006    ",
    "NMACCI": "TRANSPORT DAN AKOMODASI DIREKSI",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "729580909.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "729580909.0000"
  },
  {
    "NO": "26",
    "IDACCT": 359,
    "KDACCT": "660-007    ",
    "NMACCI": "BIAYA APPRAISAL",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "27",
    "IDACCT": 342,
    "KDACCT": "660-007    ",
    "NMACCI": "PREMI ASURANSI",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "7515000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "7515000.0000"
  },
  {
    "NO": "28",
    "IDACCT": 360,
    "KDACCT": "660-008    ",
    "NMACCI": "BEBAN SEWA BANGUNAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "127490062.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "127490062.0000"
  },
  {
    "NO": "29",
    "IDACCT": 361,
    "KDACCT": "660-009    ",
    "NMACCI": "BEBAN SEWA KENDARAAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "4660000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "4660000.0000"
  },
  {
    "NO": "30",
    "IDACCT": 362,
    "KDACCT": "660-010    ",
    "NMACCI": "BIAYA ASURANSI & KESEHATAN DIREKSI",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "1017983014.0000",
    "SALDOK": "53102350.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "964880664.0000"
  },
  {
    "NO": "31",
    "IDACCT": 363,
    "KDACCT": "660-011    ",
    "NMACCI": "BIAYA ASURANSI & KESEHATAN KARYAWAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "91380928.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "91380928.0000"
  },
  {
    "NO": "32",
    "IDACCT": 364,
    "KDACCT": "660-012    ",
    "NMACCI": "BPJS MAKASSAR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "55421550.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "55421550.0000"
  },
  {
    "NO": "33",
    "IDACCT": 365,
    "KDACCT": "660-013    ",
    "NMACCI": "BPJS ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "142034450.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "142034450.0000"
  },
  {
    "NO": "34",
    "IDACCT": 366,
    "KDACCT": "660-014    ",
    "NMACCI": "BPJS BALIKPAPAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "1785000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "1785000.0000"
  },
  {
    "NO": "35",
    "IDACCT": 367,
    "KDACCT": "660-015    ",
    "NMACCI": "JAMSOSTEK MAKASSAR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "58605189.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "58605189.0000"
  },
  {
    "NO": "36",
    "IDACCT": 368,
    "KDACCT": "660-016    ",
    "NMACCI": "JAMSOSTEK BALIKPAPAN DAN ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "491975235.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "491975235.0000"
  },
  {
    "NO": "37",
    "IDACCT": 369,
    "KDACCT": "660-017    ",
    "NMACCI": "JAMSOSTEK SINGAPORE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "262212399.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "262212399.0000"
  },
  {
    "NO": "38",
    "IDACCT": 499,
    "KDACCT": "660-018    ",
    "NMACCI": "BIAYA LANGGANAN TV KABEL, KORAN DAN MAJALAH",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "13818011.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "13818011.0000"
  },
  {
    "NO": "39",
    "IDACCT": 370,
    "KDACCT": "660-019    ",
    "NMACCI": "SERAGAM",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "4948400.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "4948400.0000"
  },
  {
    "NO": "40",
    "IDACCT": 371,
    "KDACCT": "660-020    ",
    "NMACCI": "BIAYA KONSUMSI MAKASSAR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "81268362.0000",
    "SALDOK": "4358000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "76910362.0000"
  },
  {
    "NO": "41",
    "IDACCT": 372,
    "KDACCT": "660-021    ",
    "NMACCI": "BIAYA KONSUMSI BALIKPAPAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "8208000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "8208000.0000"
  },
  {
    "NO": "42",
    "IDACCT": 373,
    "KDACCT": "660-022    ",
    "NMACCI": "BIAYA KONSUMSI JAKARTA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "12095000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "12095000.0000"
  },
  {
    "NO": "43",
    "IDACCT": 374,
    "KDACCT": "660-023    ",
    "NMACCI": "BIAYA RUMAH TANGGA KANTOR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "22814833.0000",
    "SALDOK": "30000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "22784833.0000"
  },
  {
    "NO": "44",
    "IDACCT": 375,
    "KDACCT": "660-024    ",
    "NMACCI": "BIAYA RUMAH TANGGA ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "175148500.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "175148500.0000"
  },
  {
    "NO": "45",
    "IDACCT": 376,
    "KDACCT": "660-025    ",
    "NMACCI": "BIAYA TELEPON, PULSA DAN FAX",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "27657310.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "27657310.0000"
  },
  {
    "NO": "46",
    "IDACCT": 377,
    "KDACCT": "660-026    ",
    "NMACCI": "BIAYA LISTRIK DAN AIR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "178557049.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "178557049.0000"
  },
  {
    "NO": "47",
    "IDACCT": 378,
    "KDACCT": "660-027    ",
    "NMACCI": "BIAYA INTERNET",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "224634961.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "224634961.0000"
  },
  {
    "NO": "48",
    "IDACCT": 379,
    "KDACCT": "660-028    ",
    "NMACCI": "BIAYA PEMELIHARAAN BANGUNAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "151505800.0000",
    "SALDOK": "880000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "150625800.0000"
  },
  {
    "NO": "49",
    "IDACCT": 380,
    "KDACCT": "660-029    ",
    "NMACCI": "BIAYA PEMELIHARAAN MESIN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "50",
    "IDACCT": 381,
    "KDACCT": "660-030    ",
    "NMACCI": "BIAYA PEMELIHARAAN KENDARAAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "77767213.0000",
    "SALDOK": "812300.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "76954913.0000"
  },
  {
    "NO": "51",
    "IDACCT": 382,
    "KDACCT": "660-031    ",
    "NMACCI": "BIAYA PEMELIHARAAN PERALATAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "24828500.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "24828500.0000"
  },
  {
    "NO": "52",
    "IDACCT": 383,
    "KDACCT": "660-032    ",
    "NMACCI": "BIAYA ANGKUT DAN PENGIRIMAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "178369000.0000",
    "SALDOK": "50400.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "178318600.0000"
  },
  {
    "NO": "53",
    "IDACCT": 384,
    "KDACCT": "660-033    ",
    "NMACCI": "BIAYA PENGIRIMAN DOKUMEN, DLL",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "3071100.0000",
    "SALDOK": "20000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "3051100.0000"
  },
  {
    "NO": "54",
    "IDACCT": 385,
    "KDACCT": "660-034    ",
    "NMACCI": "BIAYA KEAMANAN DAN KEBERSIHAN MAKASSAR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "11556000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "11556000.0000"
  },
  {
    "NO": "55",
    "IDACCT": 386,
    "KDACCT": "660-035    ",
    "NMACCI": "BIAYA ATK, CETAKAN DAN FOTOCOPY",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "100466042.0000",
    "SALDOK": "253800.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "100212242.0000"
  },
  {
    "NO": "56",
    "IDACCT": 387,
    "KDACCT": "660-036    ",
    "NMACCI": "BEBAN PAJAK DAN SURAT - SURAT KENDARAAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "455416000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "455416000.0000"
  },
  {
    "NO": "57",
    "IDACCT": 500,
    "KDACCT": "660-038    ",
    "NMACCI": "BEBAN PPH 21 KARYAWAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "58",
    "IDACCT": 501,
    "KDACCT": "660-039    ",
    "NMACCI": "BEBAN PPH 25/29",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "59",
    "IDACCT": 506,
    "KDACCT": "660-044    ",
    "NMACCI": "BIAYA UMUM DAN ADMINISTRASI LAINNYA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "23254976.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "23254976.0000"
  },
  {
    "NO": "60",
    "IDACCT": 578,
    "KDACCT": "660-045    ",
    "NMACCI": "BEBAN PERLENGKAPAN KANTOR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "9867000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "9867000.0000"
  },
  {
    "NO": "61",
    "IDACCT": 579,
    "KDACCT": "660-046    ",
    "NMACCI": "BIAYA PEMELIHARAAN ALAT BERAT",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "13000000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "13000000.0000"
  },
  {
    "NO": "62",
    "IDACCT": 1579,
    "KDACCT": "660-047    ",
    "NMACCI": "BIAYA ASURANSI & KESEHATAN KOMISARIS ",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "417371470.0000",
    "SALDOK": "2568800.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "414802670.0000"
  },
  {
    "NO": "63",
    "IDACCT": 1581,
    "KDACCT": "660-048    ",
    "NMACCI": "PULSA & IURAN KOMUNIKASI DIREKSI",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "113861525.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "113861525.0000"
  },
  {
    "NO": "64",
    "IDACCT": 1582,
    "KDACCT": "660-049    ",
    "NMACCI": "PULSA & IURAN KOMUNIKASI KARYAWAN MAKASSAR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "18531216.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "18531216.0000"
  },
  {
    "NO": "65",
    "IDACCT": 1584,
    "KDACCT": "660-050    ",
    "NMACCI": "BIAYA KEAMANAN DAN KEBERSIHAN ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "11050000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "11050000.0000"
  },
  {
    "NO": "66",
    "IDACCT": 1585,
    "KDACCT": "660-051    ",
    "NMACCI": "PULSA & IURAN KOMUNIKASI KARYAWAN ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "32794679.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "32794679.0000"
  },
  {
    "NO": "67",
    "IDACCT": 1618,
    "KDACCT": "660-052    ",
    "NMACCI": "KONSUMSI PEGAWAI ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "32702000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "32702000.0000"
  },
  {
    "NO": "68",
    "IDACCT": 502,
    "KDACCT": "670-001    ",
    "NMACCI": "BIAYA PENYUSUTAN BANGUNAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "69",
    "IDACCT": 483,
    "KDACCT": "670-002    ",
    "NMACCI": "BEBAN PENYUSUTAN ALAT BERAT",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "70",
    "IDACCT": 485,
    "KDACCT": "670-003    ",
    "NMACCI": "BEBAN PENYUSUTAN MESIN PROYEK",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "71",
    "IDACCT": 484,
    "KDACCT": "670-004    ",
    "NMACCI": "BEBAN PENYUSUTAN KENDARAAN PROYEK",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "72",
    "IDACCT": 486,
    "KDACCT": "670-005    ",
    "NMACCI": "BEBAN PENYUSUTAN PERALATAN DI ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "73",
    "IDACCT": 503,
    "KDACCT": "670-006    ",
    "NMACCI": "BIAYA PENYUSUTAN MESIN KANTOR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "74",
    "IDACCT": 504,
    "KDACCT": "670-007    ",
    "NMACCI": "BIAYA PENYUSUTAN KENDARAAN KANTOR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "75",
    "IDACCT": 505,
    "KDACCT": "670-008    ",
    "NMACCI": "BIAYA PENYUSUTAN PERALATAN KANTOR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "76",
    "IDACCT": 513,
    "KDACCT": "910-001    ",
    "NMACCI": "BIAYA ADMINISTRASI BANK",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "22869161.5400",
    "SALDOK": "419500.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "22449661.5400"
  },
  {
    "NO": "77",
    "IDACCT": 514,
    "KDACCT": "910-002    ",
    "NMACCI": "BIAYA ADM, PROVISI DAN ASURANSI BANK/LEASING",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "22000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "22000.0000"
  },
  {
    "NO": "78",
    "IDACCT": 515,
    "KDACCT": "910-003    ",
    "NMACCI": "BIAYA PENDIDIKAN DAN LATIHAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "79",
    "IDACCT": 516,
    "KDACCT": "910-004    ",
    "NMACCI": "UPAH BURUH DAN TUKANG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "7460000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "7460000.0000"
  },
  {
    "NO": "80",
    "IDACCT": 517,
    "KDACCT": "910-005    ",
    "NMACCI": "BIAYA KEPERLUAN KOMISARIS",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "1594351506.0000",
    "SALDOK": "2013000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "1592338506.0000"
  },
  {
    "NO": "81",
    "IDACCT": 518,
    "KDACCT": "910-006    ",
    "NMACCI": "FEE DAN BONUS KARYAWAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "26500000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "26500000.0000"
  },
  {
    "NO": "82",
    "IDACCT": 519,
    "KDACCT": "910-007    ",
    "NMACCI": "FEE KONSULTAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "495578800.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "495578800.0000"
  },
  {
    "NO": "83",
    "IDACCT": 520,
    "KDACCT": "910-008    ",
    "NMACCI": "FEE PENGAWALAN UANG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "2700000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "2700000.0000"
  },
  {
    "NO": "84",
    "IDACCT": 521,
    "KDACCT": "910-009    ",
    "NMACCI": "FEE BANK",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "160000000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "160000000.0000"
  },
  {
    "NO": "85",
    "IDACCT": 534,
    "KDACCT": "910-010    ",
    "NMACCI": "FEE TCM",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "244500000.0000",
    "SALDOK": "45000000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "199500000.0000"
  },
  {
    "NO": "86",
    "IDACCT": 522,
    "KDACCT": "910-011    ",
    "NMACCI": "FEE LAINNYA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "329241000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "329241000.0000"
  },
  {
    "NO": "87",
    "IDACCT": 523,
    "KDACCT": "910-012    ",
    "NMACCI": "SUMBANGAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "789725000.0000",
    "SALDOK": "32500000.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "757225000.0000"
  },
  {
    "NO": "88",
    "IDACCT": 524,
    "KDACCT": "910-013    ",
    "NMACCI": "SUMBANGAN YAYASAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "1511639139.0000",
    "SALDOK": "3843400.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "1507795739.0000"
  },
  {
    "NO": "89",
    "IDACCT": 533,
    "KDACCT": "910-014    ",
    "NMACCI": "SELISIH KURS (RUGI)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "90",
    "IDACCT": 571,
    "KDACCT": "910-015    ",
    "NMACCI": "BIAYA ENTERTAIN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "296639362.0000",
    "SALDOK": "411600.0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "296227762.0000"
  },
  {
    "NO": "91",
    "IDACCT": 576,
    "KDACCT": "910-016    ",
    "NMACCI": "INSENTIF KARYAWAN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "33024000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "33024000.0000"
  },
  {
    "NO": "92",
    "IDACCT": 577,
    "KDACCT": "910-017    ",
    "NMACCI": "INSENTIF DIREKSI",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "6392528039.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "6392528039.0000"
  },
  {
    "NO": "93",
    "IDACCT": 580,
    "KDACCT": "910-018    ",
    "NMACCI": "BEBAN BUNGA KPR MANDIRI (RUKO BALIKPAPAN) ",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "94",
    "IDACCT": 581,
    "KDACCT": "910-019    ",
    "NMACCI": "BEBAN BUNGA KPR BNI MKS (PENGAYOMAN SHM NO. 22)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "95",
    "IDACCT": 582,
    "KDACCT": "910-020    ",
    "NMACCI": "BEBAN BUNGA KPR PANIN (RUKO METRO BOARD CENTRO BROADWAY)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "96",
    "IDACCT": 583,
    "KDACCT": "910-021    ",
    "NMACCI": "BEBAN BUNGA KPR MANDIRI (RUKO JL. A.JEMMA)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "97",
    "IDACCT": 585,
    "KDACCT": "910-022    ",
    "NMACCI": "BEBAN BUNGA BUKOPIN (RUKO TARAKAN)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "98",
    "IDACCT": 586,
    "KDACCT": "910-023    ",
    "NMACCI": "BEBAN BUNGA KPR BNI GRIYA (RUKO DI PALOPO H.NUR) ",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "99",
    "IDACCT": 587,
    "KDACCT": "910-024    ",
    "NMACCI": "BEBAN BUNGA KPR BNI (BOUGENVILLE B-2 & BPPN W6/2)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "100",
    "IDACCT": 588,
    "KDACCT": "910-025    ",
    "NMACCI": "BEBAN BUNGA KPR PANIN (RUMAH BAU MANGGA)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "2755368.4500",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "2755368.4500"
  },
  {
    "NO": "101",
    "IDACCT": 590,
    "KDACCT": "910-026    ",
    "NMACCI": "BEBAN BUNGA MANDIRI (RUMAH OM HERY 1.7M)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "102",
    "IDACCT": 591,
    "KDACCT": "910-027    ",
    "NMACCI": "BEBAN BUNGA MANDIRI (RUKO DI PALOPO, HJ.ERNA/EVY)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "103",
    "IDACCT": 592,
    "KDACCT": "910-028    ",
    "NMACCI": "BEBAN BUNGA BNI (KMK 17 M)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "1109983335.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "1109983335.0000"
  },
  {
    "NO": "104",
    "IDACCT": 593,
    "KDACCT": "910-029    ",
    "NMACCI": "BEBAN BUNGA KPR BRI (DANA TALANGAN TA PT YFD RP.4M)",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "207244700.0900",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "207244700.0900"
  },
  {
    "NO": "105",
    "IDACCT": 594,
    "KDACCT": "910-030    ",
    "NMACCI": "BEBAN BUNGA BNI (7,8M) TAX AMNESTI PT YFD",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "129567191.6600",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "129567191.6600"
  },
  {
    "NO": "106",
    "IDACCT": 1571,
    "KDACCT": "910-031    ",
    "NMACCI": "IURAN COMDEV ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "1000000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "1000000.0000"
  },
  {
    "NO": "107",
    "IDACCT": 1586,
    "KDACCT": "910-032    ",
    "NMACCI": "SUMBANGAN ADONG",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "33870000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "33870000.0000"
  },
  {
    "NO": "108",
    "IDACCT": 1610,
    "KDACCT": "910-033    ",
    "NMACCI": "BIAYA LAIN - LAIN",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "4229067.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "4229067.0000"
  },
  {
    "NO": "109",
    "IDACCT": 1613,
    "KDACCT": "910-034    ",
    "NMACCI": "DENDA LEASING ",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "726300.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "726300.0000"
  },
  {
    "NO": "110",
    "IDACCT": 1614,
    "KDACCT": "910-035    ",
    "NMACCI": "DENDA ANGSURAN KPR",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "500000.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "500000.0000"
  },
  {
    "NO": "111",
    "IDACCT": 1625,
    "KDACCT": "910-036    ",
    "NMACCI": "BEBAN BUNGA LEASING - MAYBANK FINANCE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "5338035.2200",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "5338035.2200"
  },
  {
    "NO": "112",
    "IDACCT": 1626,
    "KDACCT": "910-037    ",
    "NMACCI": "BEBAN BUNGA LEASING - ADIRA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "113",
    "IDACCT": 1627,
    "KDACCT": "910-038    ",
    "NMACCI": "BEBAN BUNGA LEASING - BII FINANCE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "114",
    "IDACCT": 1628,
    "KDACCT": "910-039    ",
    "NMACCI": "BEBAN BUNGA LEASING - BUSSAN AUTO FINANCE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "115",
    "IDACCT": 1629,
    "KDACCT": "910-040    ",
    "NMACCI": "BEBAN BUNGA LEASING - CAT FINANCE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "116",
    "IDACCT": 1630,
    "KDACCT": "910-041    ",
    "NMACCI": "BEBAN BUNGA LEASING - CIMB ISLAMIC BANK BERHARD MALAYSIA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "117",
    "IDACCT": 1631,
    "KDACCT": "910-042    ",
    "NMACCI": "BEBAN BUNGA LEASING - IBF",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "20494403.2500",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "20494403.2500"
  },
  {
    "NO": "118",
    "IDACCT": 1632,
    "KDACCT": "910-043    ",
    "NMACCI": "BEBAN BUNGA LEASING - IMFI",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "119",
    "IDACCT": 1633,
    "KDACCT": "910-044    ",
    "NMACCI": "BEBAN BUNGA LEASING - IMFI JAKARTA",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "120",
    "IDACCT": 1634,
    "KDACCT": "910-045    ",
    "NMACCI": "BEBAN BUNGA LEASING - MANDIRI TUNAS FINANCE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": "11362998.0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": "11362998.0000"
  },
  {
    "NO": "121",
    "IDACCT": 1635,
    "KDACCT": "910-046    ",
    "NMACCI": "BEBAN BUNGA LEASING - MITSUI CAPITAL LEASING",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "122",
    "IDACCT": 1636,
    "KDACCT": "910-047    ",
    "NMACCI": "BEBAN BUNGA LEASING - OTO FINANCE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "123",
    "IDACCT": 1637,
    "KDACCT": "910-048    ",
    "NMACCI": "BEBAN BUNGA LEASING - SADIRA FINANCE",
    "FLACCT": "D",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  },
  {
    "NO": "124",
    "IDACCT": 443,
    "KDACCT": "911-020    ",
    "NMACCI": "SELISIH KURS (RUGI)",
    "FLACCT": "K",
    "SALTOT": ".0000",
    "SALDOD": ".0000",
    "SALDOK": ".0000",
    "MUTASID": ".0000",
    "MUTASIK": ".0000",
    "SALDO_AKHIR": ".0000"
  }
];

let lr = [
	{
	  "IDACCT": 1642,
	  "NMACCI": "310-002    -   IKHTISAR LABA RUGI"
	}
];

export default class Container extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  	array_jenis_jurnal:[
	  		{'label':'Pilih Jenis Jurnal',value:'0'},
	  		{'label':'Pendapatan',value:'1'},
	  		{'label':'Biaya',value:'2'}	  		
	  	],
	  	selected_jenis_jurnal:'',
	  	p1:moment(),
	  	p2:moment(),
	  	t1:moment(),
	  	t2:moment(),
	  	keterangan:'',
	  	lrdebet:0,
	  	lrkredit:0,
	  	trtotal:0,
	  	akun:[]
	  };
	}

	componentDidMount(){
		const dp1 = new Date(new Date().getFullYear(), 0, 1);
		const dp2 = new Date(new Date().getFullYear(), 11, 31);
		this.setState({
			p1:moment(dp1),
			p2:moment(dp2)
		})
	}

	handleJenisJurnal(e){

		var _this = this;
		console.log('handle jenis jurnal' ,e);
		// this.setState({ selected_jenis_jurnal:e });
		// this.forceUpdate();
		
		let jj = e.value;
		let p1 = this.state.p1.format('YYYY-MM-DD');
		let p2 = this.state.p2.format('YYYY-MM-DD');

		axios.get(`http://${config.server}:${config.port}/yfd/data/akun/tutup/jurnal/${jj}/${p1}/${p2}`)
		.then(function (response){
			console.log(response.data);
			_this.setState({
				akun:response.data,
				selected_jenis_jurnal:e
			});
		}).catch(function (err){
			console.log(err);
		});

	}

	handleDateChange( dateValue, identifier ) {		
		this.setState({ [identifier]:dateValue });		
	}

	handleKetChange( ketvalue ){
		//console.log(ketvalue.target.value);
		this.setState({ keterangan:ketvalue.target.value });
	}

	handleTotal(e){
		// console.log('dari parent' + e);
		this.setState({
			lrtotal:e
		});		
	}

	removeByKey(array, params){
	  array.some(function(item, index) {
	    return (array[index][params.key] === 'IDACCT' ) ? !!(array.splice(index, 1)) : false;
	  });
	  return array;
	}

	handleSimpan(e){

		console.log('button di click');
		
		//test_simpan_penutup
		/* test simpan */

		var data = [];

		let jj = this.state.selected_jenis_jurnal.value;
		let t1 = this.state.t1.format('YYYY-MM-DD');
		let t2 = this.state.t2.format('YYYY-MM-DD');
		let p1 = this.state.p1.format('YYYY-MM-DD');
		let p2 = this.state.p2.format('YYYY-MM-DD');
		let ket = this.state.keterangan;
		let akun = this.state.akun;
		var akun_baru = _.map(akun, function(object) {
		  return _.pick(object, ['IDACCT', 'SALDO_AKHIR']);
		});

		var obj = {
			jj:jj,
			t1:t1,
			t2:t2,
			p1:p1,
			p2:p2,
			ket:ket,
			akun:akun_baru
		}

		//console.log('ar baru ' , ar_baru);
		


		data.push(obj);
		///data/tutup/jurnal		
		axios.post(`http://${config.server}:${config.port}/yfd/data/tutup/jurnal`,{ data:data })
		.then(function (response){
			console.log(response);
		}).catch(function (err){
			console.log(err);
		});
		

		/*let userid = this.state.userid;
		let idprsh = this.state.idprsh;
		let idtran = 5;		
		let idsupl = this.state.selectedSupplier.value;// S060
		let tginpt = moment().format('YYYY-MM-DD');
		let tgltra = this.state.tgltra.format('YYYY-MM-DD');
		let tgleff = this.state.tgleff.format('YYYY-MM-DD');
		let keterangan1 = this.state.keterangan1;
		let keterangan2 = this.state.keterangan2;
		let jumtra = this.state.amount_to_pay;
		let flotor = 'T';
		let idotor = 0;
		
		var master = [];
		var ketera = [];

		var obj = {
			idprsh:idprsh,
			idtran:idtran,
			idinpt:userid,			
			tginpt:tginpt,
			tgltra:tgltra,
			tgleff:tgleff,			
			flotor:flotor,
			idotor:idotor,
			tgotor:null,
			idsupl:idsupl
			// idhtus:idhtus
		};

		var obj2 = {
			ketera1:keterangan1,
			ketera2:keterangan2,
		}

		master.push(obj);
		ketera.push(obj2);

		var _this = this;*/

		
		/* end test simpan */
	}

	render(){
		return (
            <div>
                <div id="page-title"><h3><b>PAGE NAME</b></h3><p>PAGE DESCRIPTION</p></div>
                <div className="divider"></div><br/>                    
                <div className="example-box-wrapper">                            
                    <div className="row">
                        <div className="col-md-9">
                            <span className="pull-left">
                            <a href="#" className="btn btn-sm btn-primary no-border" title="">
                            <i className="glyph-icon icon-plus-circle"></i> BUTTON</a>
                            </span>

                            <span className="pull-right">
                                <a target="_blank" href="#" className="btn btn-sm btn-info no-border" title=""><i className="glyph-icon icon-cog"></i> Print PDF</a>

                            <a href="#" className="btn btn-sm btn-success no-border" title=""><i className="glyph-icon icon-file-excel-o"></i> Export Excel</a>
                            </span>
                        </div>
                    </div>
                    
                    <div className="divider"></div><br/>                            
                    <div className="row">
                        <div className="col-md-12">
                            <form className="form-horizontal">
                                <JenisJurnal 
                                    ds={this.state.array_jenis_jurnal} 
                                    defaultValue={ this.state.selected_jenis_jurnal.value } 
                                    handleJenisJurnal={this.handleJenisJurnal.bind(this)} />
                                
                                <PeriodeSaldo 
                                    p1={this.state.p1} 
                                    p2={this.state.p2} 
                                    handleDateChange={this.handleDateChange.bind(this)} />

                                <Tanggal 
                                    t1={this.state.t1} 
                                    t2={this.state.t2} 
                                    handleDateChange={this.handleDateChange.bind(this)} />

                                <Keterangan 
                                    ds={this.state.keterangan} 
                                    handleKetChange={this.handleKetChange.bind(this)} />
                                
                                <DaftarJurnal                   
                                    ds={ this.state.akun }
                                    jenis={ this.state.selected_jenis_jurnal.value }  />
                                
                                <AkunLabaRugi 
                                    jenis_jurnal={ this.state.selected_jenis_jurnal.value }
                                    ds={lr}                     
                                    ds2={ this.state.akun }
                                    lrdebet={this.state.lrdebet} 
                                    lrkredit={this.state.lrkredit} 
                                    lrtotal={this.state.lrtotal} 
                                    handleTotal={this.handleTotal.bind(this)} />
                                
                                <ButtonSubmit handleSimpan={this.handleSimpan.bind(this)} />                                    
                            </form>
                        </div>
                    </div>
                </div>                    
            </div>            		
		);
	}  
}

class ButtonSubmit extends Component {

	handleSimpan(e){
		e.preventDefault();
		
		this.props.handleSimpan(e);
	}

	render(){
		return (
			<div className="form-group">				
				<label htmlFor="" className="control-label col-sm-2 "></label>
				<div className="col-sm-4">
					<button className="btn btn-sm btn-success" onClick={this.handleSimpan.bind(this)}>Simpan</button>
				</div>
			</div>
		);
	}
}

class JenisJurnal extends Component {	

	handleJenisJurnal(e){
		this.props.handleJenisJurnal(e);
	}

	render(){
		return (
			<div className="form-group">
				<div className="col-sm-4 col-sm-offset-2">

					<Select name="jenis_jurnal" 					 
						options = { this.props.ds } 
						value = { this.props.defaultValue } 
						onChange = {this.handleJenisJurnal.bind(this)}
						clearable = { false } 
						placeholder={'Pilih Jenis Jurnal'} />

				</div>
			</div>
		);
	}

}

class PeriodeSaldo extends Component {	

	handleChange( dateValue, identifier ) {
		this.props.handleDateChange(dateValue,identifier);
	}

	render(){

		return (
			<div className="form-group">
				
				<label htmlFor="" className="control-label col-sm-2 ">PERIODE</label>
				<div className="col-sm-2">

					<DatePicker 
						onChange={ (e) => this.handleChange(e,'p1') } 
						selected={this.props.p1} 
						maxDate={moment().add(0,"days")} 
						dateFormat="DD/MM/YYYY" 
						className="form-control input-sm" />
				</div>
				
				<div className="col-sm-2">

					<DatePicker 
						readonly={true}
						disabled={true}
						onChange={ (e) => this.handleChange(e,'p2') } 
						selected={this.props.p2} 
						maxDate={moment().add(0, "days")} 
						dateFormat="DD/MM/YYYY" 
						className="form-control input-sm" />

				</div>
			</div>
		);
	}
}

class Tanggal extends Component {

	handleChange( dateValue, identifier ) {
		this.props.handleDateChange(dateValue,identifier);
	}

	render(){

		return (
			<div className="form-group">
				
				<label htmlFor="" className="control-label col-sm-2 ">TANGGAL</label>
				<div className="col-sm-2">

					<DatePicker 
						onChange={ (e) => this.handleChange(e,'t1') } 
						selected={this.props.t1} 
						maxDate={moment().add(0,"days")} 
						dateFormat="DD/MM/YYYY" 
						className="form-control input-sm" />
				</div>
				
				<div className="col-sm-2">

					<DatePicker 
						onChange={ (e) => this.handleChange(e,'t2') } 
						selected={this.props.t2} 
						maxDate={moment().add(0, "days")} 
						dateFormat="DD/MM/YYYY" 
						className="form-control input-sm" />

				</div>
			</div>
		);
	}

}

class Keterangan extends Component{
	handleChange(ketvalue){
		this.props.handleKetChange(ketvalue);
		// console.log(ketvalue);
	}
	render(){
		return (
			<div className="form-group">
				<label htmlFor="" className="control-label col-sm-2 ">KETERANGAN</label>
				<div className="col-sm-4">
					<textarea className="form-control" onChange={(e)=> this.handleChange(e)} value={this.props.ds}>						
					</textarea>
				</div>
			</div>
		);
	}
}

class DaftarJurnal extends Component{
	componentDidMount(){
		console.log('im mounting');
	}

	render(){
	let dtJurnal = this.props.ds;
		return (
			<div>
			{dtJurnal.map((akun)=>
				<div className="form-group">					
					<div className="col-sm-6 col-sm-offset-2">
						<select className="form-control input-sm">
							<option value={akun.IDACCT}>{`${akun.KDACCT} - ${akun.NMACCI}`}</option>
						</select>
					</div>
					<div className="col-sm-2">					
						<NumberFormat displayType={'text'} 
							value={ this.props.jenis === '1' ? akun.SALDO_AKHIR : 0 } 
							thousandSeparator={true} 
							decimalSeparator={'.'} 
							decimalPrecision={2} 
							className="form-control input-sm" dir="rtl" />
					</div>
					<div className="col-sm-2">					
						<NumberFormat displayType={'text'} 
							value={ this.props.jenis === '1' ? 0 : akun.SALDO_AKHIR }
							thousandSeparator={true} 
							decimalSeparator={'.'} 
							decimalPrecision={2} 
							className="form-control input-sm" dir="rtl" />
					</div>
				</div>
			)}
			</div>
		);
	}
}

class AkunLabaRugi extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	  	total:0
	  }

	  this.hitungTotal = this.hitungTotal.bind(this);
	}

	hitungTotal(arrayToCount){
		var nilai = parseFloat(arrayToCount.reduce((prev,next) => prev + next.SALDO_AKHIR,0));
		this.setState({ total: nilai });
	}

	componentWillReceiveProps(nextProps){
		this.hitungTotal(nextProps.ds2);
	}

	render(){
	let dtLabaRugi = this.props.ds;
		return (
			<div>
			{dtLabaRugi.map((akun)=>
				<div className="form-group">
					<div className="col-sm-6 col-sm-offset-2">
						<select className="form-control input-sm">
							<option value={akun.IDACCT}>{akun.NMACCI}</option>
						</select>
					</div>				
					<div className="col-sm-2">					
						<NumberFormat displayType={'input'} 
							value={ this.props.jenis_jurnal === '1' ? 0 : this.state.total } 
							thousandSeparator={true} 
							decimalSeparator={'.'} 
							decimalPrecision={2} 
							className="form-control input-sm" dir="rtl" />
					</div>
					<div className="col-sm-2">					
						<NumberFormat displayType={'input'} 
							value={ this.props.jenis_jurnal === '1' ? this.state.total : 0 } 
							thousandSeparator={true} 
							decimalSeparator={'.'} 
							decimalPrecision={2} 
							className="form-control input-sm" dir="rtl" />
					</div>
				</div>
			)}
			</div>
		);
	}
}

/*
requirement :
pilih jenis jurnal yang akan ditutup. pendapatan atau biaya
pilih periode awal dan akhir dari periode transaksi pendapatan atau biaya

periode awal default date = tanggal 1 januari tahun berjalan, 
minDate = tanggal 1 januari tahun berjalan s/d tanggal 1 januari tahun sebelumnya, 
max date = tanggal 1 januari tahun berjalan  
periode akhir readonly value nya ditrigger dari pemilihan periode awal 
default date = tanggal 31 desember sesuai tahun dari periode awal.

pilih tanggal transaksi & tanggal efektif
isi keterangan utama dan keterangan tambahan

setelah jenis jurnal dipilih misalnya akan tampil daftar akun pendapatan dan total saldo akhir dari akun pendapatan tsb 
jika jenis jurnal pendapatan maka saldo akhir pada posisi DEBET dan akun Ikhtisar Laba Rugi pada posisi KREDIT.
nilai ikhtisar Laba Rugi didapatkan dari total akun pendapatan
setiap perubahan nilai pada akun pendapatan maka akan dijumlahkan sebagai nilai total ke field Nilai Ikhtisar Laba Rugi.
*/