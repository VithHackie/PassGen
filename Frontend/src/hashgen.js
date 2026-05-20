import {
  createAdler32,
  createBLAKE2b,
  createBLAKE2s,
  createBLAKE3,
  createCRC32,
  createCRC64,
  createKeccak,
  createMD4,
  createMD5,
  createRIPEMD160,
  createSHA1,
  createSHA224,
  createSHA256,
  createSHA3,
  createSHA384,
  createSHA512,
  createSM3,
  createWhirlpool,
  createXXHash128,
  createXXHash3,
  createXXHash32,
  createXXHash64,
} from "hash-wasm";

export const hashGenerator = async (inputText) => {

    const allHashes = []

  //SHA's

  const sha512 = await createSHA512();
  const sha384 = await createSHA384();
  const sha256 = await createSHA256();
  const sha224 = await createSHA224();
  const sha3 = await createSHA3();
  const sha1 = await createSHA1();

  sha512.update(inputText);
  sha384.update(inputText);
  sha256.update(inputText);
  sha224.update(inputText);
  sha3.update(inputText);
  sha1.update(inputText);

  allHashes.push({"sha512" : sha512.digest()})
  allHashes.push({"sha384" : sha384.digest()})
  allHashes.push({"sha256" : sha256.digest()})
  allHashes.push({"sha224" : sha224.digest()})
  allHashes.push({"sha3" : sha3.digest()})
  allHashes.push({"sha1" : sha1.digest()})

  //MD's

  const md5 = await createMD5();
  const md4 = await createMD4();
  const ripemd = await createRIPEMD160();

  md5.update(inputText);
  md4.update(inputText);
  ripemd.update(inputText)

  allHashes.push({"md5" : md5.digest()})
  allHashes.push({"md4" : md4.digest()})
  allHashes.push({"ripemd" : ripemd.digest()})

  //ADLER
  const adler32 = await createAdler32();

  adler32.update(inputText);

  allHashes.push({"adler32" : adler32.digest()})

  //BLAKE

  const blake2b = await createBLAKE2b();
  const blake2s = await createBLAKE2s();
  const blake3 = await createBLAKE3();

  blake2b.update(inputText);
  blake2s.update(inputText);
  blake3.update(inputText);

  allHashes.push({"blake2b" : blake2b.digest()})
  allHashes.push({"blake2s" : blake2s.digest()})
  allHashes.push({"blake3" : blake3.digest()})

  //CRC

  const crc32 = await createCRC32();
  const crc64 = await createCRC64();

  crc32.update(inputText);
  crc64.update(inputText);

  allHashes.push({"crc32" : crc32.digest()})
  allHashes.push({"crc64" : crc64.digest()})

  //KECCAK

  const keccak512 = await createKeccak(512);
  const keccak384 = await createKeccak(384);
  const keccak256 = await createKeccak(256);
  const keccak224 = await createKeccak(224);

  keccak512.update(inputText);
  keccak384.update(inputText);
  keccak256.update(inputText);
  keccak224.update(inputText);

  allHashes.push({"keccak512" : keccak512.digest()})
  allHashes.push({"keccak384" : keccak384.digest()})
  allHashes.push({"keccak256" : keccak256.digest()})
  allHashes.push({"keccak224" : keccak224.digest()})

  //SM's

  const sm3 = await createSM3()

  sm3.update(inputText)

  allHashes.push({"sm3" : sm3.digest()})

  //WHIRLPOOL

  const whirlpool = await createWhirlpool()

  whirlpool.update(inputText)

  allHashes.push({"whirlpool" : whirlpool.digest()})


  //XXHASH

  const xxhash128 = await createXXHash128()
  const xxhash64 = await createXXHash64()
  const xxhash32 = await createXXHash32()
  const xxhash3 = await createXXHash3()

  xxhash128.update(inputText)
  xxhash64.update(inputText)
  xxhash32.update(inputText)
  xxhash3.update(inputText)

  allHashes.push({"xxhash128" : xxhash128.digest()})
  allHashes.push({"xxhash64" : xxhash64.digest()})
  allHashes.push({"xxhash32" : xxhash32.digest()})
  allHashes.push({"xxhash3" : xxhash3.digest()})

//   console.log(allHashes)
  return allHashes
};
