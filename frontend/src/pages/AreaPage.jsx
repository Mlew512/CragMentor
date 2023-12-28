import React, { useEffect, useState } from 'react';
import { Link, useOutletContext,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAPI, endpoints } from '../utilities/api';


const area =    {
  "areaName": "Red Rock",
  "area_name": "Red Rock",
  "parent": {
    "id": "6368a473e80bff5a9959f81c",
    "areaName": "Stone Fort Bouldering"
  },
  "climbs": [],
  "density": 13.828965201650078,
  "content": {
    "description": ""
  },
  "gradeContext": "US",
  "id": "6368a185e80bff5a9954f2a0",
  "metadata": {
    "areaId": "bea6bf11-de53-5046-a5b4-b89217b7e9bc",
    "bbox": [
      -115.5212270975031,
      35.99719033981813,
      -115.40493303733979,
      36.18222966018187
    ],
    "isDestination": false,
    "isBoulder": false,
    "lat": 36.11031166609558,
    "leaf": false,
    "lng": -115.47066989416903
  },
  "pathTokens": [
    "USA",
    "Nevada",
    "Southern Nevada",
    "Red Rocks"
  ],
  "shortCode": "",
  "totalClimbs": 2980,
  "uuid": "bea6bf11-de53-5046-a5b4-b89217b7e9bc",
  "media": [
    {
      "id": "64579784588e85d8f894b6bf",
      "mediaUrl": "/u/6deccbbe-cc4c-4ea0-8fea-e84b8746422a/dRG8gfNnwG.jpg"
    },
    {
      "id": "64579784588e85d8f894b6c0",
      "mediaUrl": "/u/6deccbbe-cc4c-4ea0-8fea-e84b8746422a/K8WpJmQjnF.jpg"
    },
    {
      "id": "64579784588e85d8f894b6c1",
      "mediaUrl": "/u/6deccbbe-cc4c-4ea0-8fea-e84b8746422a/MzQCHtcRMp.jpg"
    },
    {
      "id": "64579784588e85d8f894b6c2",
      "mediaUrl": "/u/6deccbbe-cc4c-4ea0-8fea-e84b8746422a/HCWJNfw6g6.jpg"
    },
    {
      "id": "654ad15a04e897bed4774f5d",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/MJHWrkjW8K.jpeg"
    },
    {
      "id": "654aded604e897bed4777c0d",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/kHz6wzknhb.jpeg"
    },
    {
      "id": "654adeda04e897bed4777c1d",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/TPczCFBzJW.jpeg"
    },
    {
      "id": "6558ce5f0eefb3dd16c0acdc",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/dKDggk9mQQ.jpg"
    },
    {
      "id": "645796d3588e85d8f894b5af",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/la-cierta-edad-red-rock.jpeg"
    },
    {
      "id": "645796b6588e85d8f894b583",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/the-rox-red-rock.jpeg"
    },
    {
      "id": "645796fd588e85d8f894b5f4",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/IMG_6150.JPG"
    },
    {
      "id": "645796e0588e85d8f894b5d2",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/bzdNbmjmcf.jpeg"
    },
    {
      "id": "645796a7588e85d8f894b575",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/ying-yang.jpeg"
    },
    {
      "id": "645796ef588e85d8f894b5e7",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/PMK86dhBHF.jpg"
    },
    {
      "id": "6457970a588e85d8f894b601",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/G8zLdPrnQn.jpg"
    },
    {
      "id": "6558d0d10eefb3dd16c0af81",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/96BBbGrdBk.jpg"
    },
    {
      "id": "6558d36a0eefb3dd16c0b227",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/LhmBGkKbGK.jpg"
    },
    {
      "id": "6558d38f0eefb3dd16c0b243",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/6mzQttDhBg.jpg"
    },
    {
      "id": "6558d3900eefb3dd16c0b24e",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/KJJbtbfLfb.jpg"
    },
    {
      "id": "645796a7588e85d8f894b56c",
      "mediaUrl": "/u/afe76c7c-c224-49f6-a89b-c9dc06365af5/Kd6Nb8tKcW.jpg"
    },
    {
      "id": "6558e6a10eefb3dd16c0e3a3",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/rQpNTWLgLf.jpg"
    },
    {
      "id": "6558e7cc0eefb3dd16c0ec1e",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/NmFz9THC7D.jpg"
    },
    {
      "id": "6558e7cc0eefb3dd16c0ec22",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/NzKrfqCMkp.jpg"
    },
    {
      "id": "656df8ab23fd683119fb6167",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/QPbLCLRMJC.jpeg"
    },
    {
      "id": "656df92323fd683119fb6598",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/6PhRDRk8fg.jpeg"
    },
    {
      "id": "656df95923fd683119fb65be",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/7kjCbqNJ9k.jpeg"
    },
    {
      "id": "654948fa04e897bed4739ea5",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/bh6Jk6T9hN.jpg"
    },
    {
      "id": "645796c4588e85d8f894b5a5",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/mushroom-people.jpeg"
    },
    {
      "id": "65485bfb04e897bed4714251",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/gMmbczMtgw.jpeg"
    },
    {
      "id": "65485c5e04e897bed471437a",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/jGGQKKztND.jpeg"
    },
    {
      "id": "65485df304e897bed4714ff4",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/ztnWtTWRbm.jpeg"
    },
    {
      "id": "65485eb204e897bed471572b",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/CLkkwPtrkW.jpeg"
    },
    {
      "id": "656214f40eefb3dd16d2b40d",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/KzKTMh8CKF.jpeg"
    },
    {
      "id": "656214f80eefb3dd16d2b412",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/nkGjGjdmzj.jpeg"
    },
    {
      "id": "656214fd0eefb3dd16d2b417",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/MdfRQqhBL7.jpeg"
    },
    {
      "id": "654ae4c604e897bed4778f31",
      "mediaUrl": "/u/ab8a69e7-6dfe-4797-b235-8e151d3cf87f/mrht66G87Q.jpg"
    },
    {
      "id": "6583b53f567fd2b089c2b2ba",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/KmBFtPW6bm.jpg"
    },
    {
      "id": "6583b500567fd2b089c2aed1",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/wcG7MRgRWt.jpg"
    },
    {
      "id": "656214210eefb3dd16d2b3d6",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/PzQpRn97MQ.jpeg"
    },
    {
      "id": "656214280eefb3dd16d2b3db",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/9HjGfTDjbm.jpeg"
    },
    {
      "id": "64579639588e85d8f894b4e2",
      "mediaUrl": "/u/e17bba6e-c2a2-4d63-afb8-4e2ab4d71494/6Q79TGgftW.jpeg"
    },
    {
      "id": "652abca2c4a448cde9841f5a",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/fbqcJd6fhG.jpg"
    },
    {
      "id": "652abca2c4a448cde9841f60",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/96RwrnfGnD.jpg"
    },
    {
      "id": "652abcc4c4a448cde9841f77",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/g8FhwNpQ8Q.jpeg"
    },
    {
      "id": "6549a67e04e897bed474a37b",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/JwGWDb7c9n.jpeg"
    },
    {
      "id": "652abcdec4a448cde9841fb8",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/bpPDqBbQp9.jpg"
    },
    {
      "id": "64579629588e85d8f894b4c9",
      "mediaUrl": "/u/f609e941-0f9c-4fe7-99d4-aa255e1556ab/kzfW7rNjwJ.jpeg"
    },
    {
      "id": "64579629588e85d8f894b4ca",
      "mediaUrl": "/u/f609e941-0f9c-4fe7-99d4-aa255e1556ab/h6mkG8bCcq.jpg"
    },
    {
      "id": "64579629588e85d8f894b4cb",
      "mediaUrl": "/u/f609e941-0f9c-4fe7-99d4-aa255e1556ab/JHFjgGKjjp.jpg"
    },
    {
      "id": "6584d311567fd2b089c56879",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/KrdWFDnmkk.jpeg"
    },
    {
      "id": "6583bede567fd2b089c2ce34",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/GRDLrcGkGr.jpg"
    },
    {
      "id": "6583bede567fd2b089c2ce38",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/WcNTfwrCrR.jpg"
    },
    {
      "id": "6583a5ad567fd2b089c281f6",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/HDmmtNjzKn.jpeg"
    },
    {
      "id": "6583b8b6567fd2b089c2bbb4",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/LzhMJn6TDW.jpg"
    },
    {
      "id": "6583bac7567fd2b089c2c211",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/zGFTqgRFPm.jpg"
    },
    {
      "id": "6583bc78567fd2b089c2c4b8",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/H8gnhpfKJK.jpg"
    },
    {
      "id": "652c5074c4a448cde9851a23",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/QJqjHzLNRP.jpeg"
    },
    {
      "id": "6584d2b0567fd2b089c562ae",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/8grLCK6b6R.jpeg"
    },
    {
      "id": "6588b57f567fd2b089cfd600",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/L6MGcNFBdg.jpeg"
    },
    {
      "id": "645796e0588e85d8f894b5c2",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/earth-angel.jpeg"
    },
    {
      "id": "652c5044c4a448cde98519dd",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/rkgQHnkt9q.jpeg"
    },
    {
      "id": "652c5044c4a448cde98519d8",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/Qg9pqFcD9c.jpeg"
    },
    {
      "id": "6584d2f3567fd2b089c56668",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/m6QgcCG6cj.jpeg"
    },
    {
      "id": "6584d37b567fd2b089c568e4",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/7PFmKDdj6Q.jpeg"
    },
    {
      "id": "6584d37b567fd2b089c568e9",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/TBmJpdBCtC.jpeg"
    },
    {
      "id": "652c50b8c4a448cde9851ca9",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/CGjTW6GQfD.jpeg"
    },
    {
      "id": "652c50b8c4a448cde9851caf",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/Czp7BwrqH9.jpeg"
    },
    {
      "id": "652c50b9c4a448cde9851cb5",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/7fdbkDdfcz.jpeg"
    },
    {
      "id": "6588b6c8567fd2b089cfdf29",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/qddhDPhTDh.jpeg"
    },
    {
      "id": "6588b6c8567fd2b089cfdf2f",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/bLFbndKH6P.jpeg"
    },
    {
      "id": "6588b6c8567fd2b089cfdf39",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/zRFwMRtMWM.jpeg"
    },
    {
      "id": "6588b6c8567fd2b089cfdf5b",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/ghzf9M6wLc.jpeg"
    },
    {
      "id": "6588b6c9567fd2b089cfdf71",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/KQFrr9TrQp.jpeg"
    },
    {
      "id": "6588b6c9567fd2b089cfdf79",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/JKgLnk6jPQ.jpeg"
    },
    {
      "id": "652c4f87c4a448cde9851909",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/g9GnQnqFQb.jpeg"
    },
    {
      "id": "652c4f89c4a448cde985190e",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/zGQJPdDQkG.jpeg"
    },
    {
      "id": "652c4f89c4a448cde9851911",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/CgBWGQnTBw.jpeg"
    },
    {
      "id": "652c4f89c4a448cde9851916",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/TFF788kKP6.jpeg"
    },
    {
      "id": "652c5017c4a448cde985199f",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/CkQM9FrFRm.jpeg"
    },
    {
      "id": "652c5017c4a448cde98519a5",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/kgkwGmbJLh.jpeg"
    },
    {
      "id": "6584d32e567fd2b089c568b1",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/mfjwDBzHm8.jpeg"
    },
    {
      "id": "6584d354567fd2b089c568c7",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/8hbCbDqL9Q.jpeg"
    },
    {
      "id": "6584d530567fd2b089c56d0d",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/Q98zNHnpfK.jpeg"
    },
    {
      "id": "6584d530567fd2b089c56d12",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/BCkRjjt8HG.jpeg"
    },
    {
      "id": "645796b6588e85d8f894b584",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/the-pearl-red-rock.jpeg"
    },
    {
      "id": "6584d4e2567fd2b089c56a9c",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/mqnG7WjcG7.jpeg"
    },
    {
      "id": "652c51abc4a448cde9851e11",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/WkBPgBdMfT.jpeg"
    },
    {
      "id": "652c51abc4a448cde9851e15",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/DHHDQprcPD.jpeg"
    },
    {
      "id": "6588b633567fd2b089cfde42",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/kmMBD7FMgM.jpeg"
    },
    {
      "id": "6588b634567fd2b089cfde51",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/bcrcjtpFPH.jpeg"
    },
    {
      "id": "6588b634567fd2b089cfde55",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/PdtnRMdBQf.jpeg"
    },
    {
      "id": "658b7d16567fd2b089e3cc42",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/dmjcqrFhgD.jpeg"
    },
    {
      "id": "658b7983567fd2b089e3a126",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/Kqm66KR6wf.jpeg"
    },
    {
      "id": "658b7983567fd2b089e3a12b",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/BTzTfPPTNP.jpeg"
    },
    {
      "id": "658b7935567fd2b089e3a0f8",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/wqm7cQGMJJ.jpeg"
    },
    {
      "id": "658b7a22567fd2b089e3a9c8",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/CFnrNqDJjt.jpeg"
    },
    {
      "id": "658b7900567fd2b089e3a0ac",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/w7cgnpJDMB.jpeg"
    },
    {
      "id": "658b7900567fd2b089e3a0b4",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/gpr9rWHHtj.jpeg"
    },
    {
      "id": "645796b6588e85d8f894b588",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/the-fountain-head.jpeg"
    },
    {
      "id": "653e95f104e897bed4546bed",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/TTFtrPzbcF.jpg"
    },
    {
      "id": "645796e0588e85d8f894b5cc",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/cloud-tower-red-rock.jpeg"
    },
    {
      "id": "645796ef588e85d8f894b5df",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/WjDWrFPMNr.jpeg"
    },
    {
      "id": "64579784588e85d8f894b6ce",
      "mediaUrl": "/u/6a13c0d0-dd15-4c78-9a78-c2bc7353f1e5/M8ft6RpNmj.jpg"
    },
    {
      "id": "6589f589567fd2b089d7e378",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/FLfRgw7Rgz.jpg"
    },
    {
      "id": "645796d3588e85d8f894b5b9",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/hzWrJgKHnd.jpeg"
    },
    {
      "id": "645795fe588e85d8f894b48c",
      "mediaUrl": "/u/f9db37a1-8659-470c-8c4e-7fe2a8ead44f/Wjm6qjqNBF.jpeg"
    },
    {
      "id": "645796b6588e85d8f894b585",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/the-night-crawler.jpeg"
    },
    {
      "id": "64b578e06617e92410d79391",
      "mediaUrl": "/u/ab312eec-2029-4d11-bf8c-aae19ed2132b/wB8fcWDQnM.jpeg"
    },
    {
      "id": "652ab927c4a448cde9841e95",
      "mediaUrl": "/u/e18e9699-07b1-4704-962d-10a8c3374585/pqKw9hbjdH.jpg"
    },
    {
      "id": "645796ef588e85d8f894b5e2",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/TLpNdHBGmW.jpeg"
    },
    {
      "id": "64b578df6617e92410d7938b",
      "mediaUrl": "/u/ab312eec-2029-4d11-bf8c-aae19ed2132b/9JTPhqJbCG.jpeg"
    },
    {
      "id": "64b578df6617e92410d7938d",
      "mediaUrl": "/u/ab312eec-2029-4d11-bf8c-aae19ed2132b/QmTL6NPLtH.jpeg"
    },
    {
      "id": "6589f829567fd2b089d80116",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/9ffC8W6dCR.jpg"
    },
    {
      "id": "6589f86a567fd2b089d80579",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/rpJGrMtT8R.jpg"
    },
    {
      "id": "6589f882567fd2b089d805a4",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/rrCMRWJBcz.jpg"
    },
    {
      "id": "6541626504e897bed45ff204",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/qzhhzJhb9f.jpeg"
    },
    {
      "id": "645796b6588e85d8f894b592",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/red-rock-the-gallery.jpeg"
    },
    {
      "id": "645796c4588e85d8f894b5a9",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/magic-bus-red-rock.jpeg"
    },
    {
      "id": "64579689588e85d8f894b548",
      "mediaUrl": "/u/b24adf37-c3f9-4429-b082-569048ec091c/WG7MjPHQGk.jpeg"
    },
    {
      "id": "64579784588e85d8f894b6c8",
      "mediaUrl": "/u/6ccd5463-50f0-4af3-bd63-9b818f958751/cgPRdjbhDM.jpg"
    },
    {
      "id": "645796b6588e85d8f894b594",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/red-rock-great-red-book.jpeg"
    },
    {
      "id": "64579784588e85d8f894b6c9",
      "mediaUrl": "/u/6ccd5463-50f0-4af3-bd63-9b818f958751/LJHTQzjL6G.JPG"
    },
    {
      "id": "656ba50923fd683119f1c86e",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/L8Ft7TFFWg.jpg"
    },
    {
      "id": "654162e004e897bed45ff459",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/pNw9kqRcHC.jpeg"
    },
    {
      "id": "645796b6588e85d8f894b58d",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/sour-mash2.jpeg"
    },
    {
      "id": "645796e0588e85d8f894b5c1",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/epi.jpeg"
    },
    {
      "id": "654115a604e897bed45f1f49",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/BhCLRwjCWt.jpeg"
    },
    {
      "id": "6541652804e897bed45ffdc7",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/TfrDzFFFkT.jpeg"
    },
    {
      "id": "6541659504e897bed45ffdea",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/kgnTCpzrGk.jpeg"
    },
    {
      "id": "64579792588e85d8f894b6e1",
      "mediaUrl": "/u/6160122a-fd85-422e-ad4e-8f404a84a2f5/LJTP7pkjKg.jpeg"
    },
    {
      "id": "64579792588e85d8f894b6de",
      "mediaUrl": "/u/6160122a-fd85-422e-ad4e-8f404a84a2f5/P6qbpH7FLQ.jpeg"
    },
    {
      "id": "645796b6588e85d8f894b587",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/the-dragon-red-rock.jpeg"
    },
    {
      "id": "645796ef588e85d8f894b5e5",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/R6LjLC7PQc.jpeg"
    },
    {
      "id": "6549a6c204e897bed474a61b",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/mTGtgnqHrM.jpeg"
    },
    {
      "id": "6549a7d804e897bed474a9db",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/gGkLCKK89c.jpeg"
    },
    {
      "id": "6549a7f904e897bed474aa12",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/fTpRrzdPWM.jpeg"
    },
    {
      "id": "6549a8bf04e897bed474ad25",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/rQBJrm7MNR.jpeg"
    },
    {
      "id": "6549a95c04e897bed474b008",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/PkQQ9BTtzL.jpeg"
    },
    {
      "id": "6541639204e897bed45ff769",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/9QqnGcFhQq.jpeg"
    },
    {
      "id": "65734cffc64fef032a51bbdd",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/9Whff67NJj.jpeg"
    },
    {
      "id": "65734db9c64fef032a51bbfb",
      "mediaUrl": "/u/abe96612-2742-43b0-a128-6b19d4e4615f/n6kqzp6mfJ.jpeg"
    }
  ],
  "children": [
    {
      "areaName": "19-Southern Outcrops",
      "id": "6368a185e80bff5a9954f2a1"
    },
    {
      "areaName": "18-Windy Peak",
      "id": "6368a185e80bff5a9954f2a3"
    },
    {
      "areaName": "17-Mud Spring Canyon",
      "id": "6368a185e80bff5a9954f2a5"
    },
    {
      "areaName": "15-Sandstone Canyon",
      "id": "6368a185e80bff5a9954f2a7"
    },
    {
      "areaName": "14-First Creek Canyon",
      "id": "6368a185e80bff5a9954f2a9"
    },
    {
      "areaName": "13-Mt. Wilson",
      "id": "6368a185e80bff5a9954f2ab"
    },
    {
      "areaName": "12-Oak Creek Canyon",
      "id": "6368a185e80bff5a9954f2ad"
    },
    {
      "areaName": "11-Juniper Canyon",
      "id": "6368a185e80bff5a9954f2af"
    },
    {
      "areaName": "10-Pine Creek Canyon",
      "id": "6368a185e80bff5a9954f2b1"
    },
    {
      "areaName": "16-Black Velvet Canyon",
      "id": "6368a185e80bff5a9954f2be"
    },
    {
      "areaName": "08-The Promised Land",
      "id": "6368a185e80bff5a9954f321"
    },
    {
      "areaName": "09-Icebox Canyon",
      "id": "6368a185e80bff5a9954f325"
    },
    {
      "areaName": "07-Willow Spring",
      "id": "6368a185e80bff5a9954f328"
    },
    {
      "areaName": "06-White Rock Spring",
      "id": "6368a185e80bff5a9954f32a"
    },
    {
      "areaName": "05-Sandstone Quarry",
      "id": "6368a185e80bff5a9954f32c"
    },
    {
      "areaName": "04-Second Pullout (Calico II)",
      "id": "6368a185e80bff5a9954f32e"
    },
    {
      "areaName": "03-First Pullout (Calico I)",
      "id": "6368a185e80bff5a9954f330"
    },
    {
      "areaName": "02-Calico Peaks",
      "id": "6368a185e80bff5a9954f332"
    },
    {
      "areaName": "* Red Rock Bouldering",
      "id": "6368a185e80bff5a9954f342"
    },
    {
      "areaName": "01-Calico Basin",
      "id": "6368a185e80bff5a9954f444"
    }
  ]
}





function AreaPage() {
    const [dataID, setDataID] = useState(null)
    const [data, setData] = useState(null)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        let id = null
        if(params.id)id = params.id
        if(dataID != id){
            setDataID(id)
        }
      },[params])

      useEffect(()=>{
        setIsLoading(true)
        getData()
      },[dataID])


    const getData = async () => {
        const response = await getAPI(`${endpoints.area}${dataID}`)
        console.log(response)
        if(response.status){
            setData(response.data.result)
            setIsLoading(false)
            setMessage('')
        }else{
            // setMessage('Something went wrong!')
            // setData(null)
            // setIsLoading(false)

            setData(area)//remove
            setIsLoading(false)
        }



    };
   

    return (
        <>
        
        

        {message != "" &&
        <p>{message}</p>
        }
        {
            isLoading == false && data != null ?
            (
                <>
                <section>  
                    {
                        data.media.length > 0 &&
                        <img style={{width:'100px'}} src={"https://media.openbeta.io/" + data.media[0]['mediaUrl']}/>
                    }
                    {data.areaName}
                    {data.density}
                    {data.isDestination}
                    {data.isBoulder}
                    {data.totalClimbs}
                    <a href={"/area/"+data.parent.id}>Go to parent area</a>

                    <p>description - {data.content.description}</p>
    

                        {data.children.length > 0 &&
                            <>
                            <p>Areas</p>
                            <ul>
                            {data.children.map((area, index) => {
                                return (
                                  <li key={index}><a href={"/area/"+area.id}>{area.areaName}</a></li>
                                  );
                                })}
                            </ul>
                            </>
                        }
                           {data.climbs.length > 0 &&
                            <>
                            <p>Climbs</p>
                            <ul>
                            {data.climbs.map((climb, index) => {
                                return (
                                    <li key={index}><a href={"/route/"+climb.id}>{climb.name}</a></li>
                                );
                                })}
                            </ul>
                            </>
                        }
                </section>


                </>
            ):
            (
                <p>Loading</p>
            )
        }
        </>
    )


}

export default AreaPage;