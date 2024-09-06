# image-compressor

Simple CLI to compress JPEG images and videos in bulk.

## Prerequisites

- [Bun](https://bun.sh/)
- [FFmpeg](https://ffmpeg.org/)
- Linux/MacOS (or Windows with WSL - you might be able to get it working with Cygwin, but I haven't tried)

## Installation

Assuming you have Bun installed, set up the project with:

```sh
bun install
```

## Usage

This CLI takes two arguments: the input directory and the output directory. It will compress all
images and videos in the input directory and save them to the output directory, leaving the originals
untouched.

```sh
bun compress <input-dir> <output-dir> [flags]
```

By default, CPU is used for both video decoding and encoding. If you have a GPU, it's highly recommended
to use hardware acceleration for video encoding, as it can be significantly faster. For example, with
a 1min 24s video on my NVIDIA RTX 3080, it takes around 10 seconds to compress, while my AMD Ryzen 9 3900X
CPU takes around 3 minutes.

Check the optional flags below for details on configuring hardware acceleration. If you're on an NVIDIA
GPU like me, here's an example command that may work for you:

```sh
bun compress --encoder hevc_nvenc --hwaccel nvdec <input-dir> <output-dir>
```

## Optional Flags

- `-b, --batch-size`: The number of images/videos to compress in parallel. Default is 4. If using
  hardware acceleration, it may have a limit on the number of concurrent video encodes, decrease
  this number if you see FFmpeg crashes relating to hardware acceleration.

- `-e, --encoder`: Hardware acceleration to use for video encoding. Default is `libx265` (CPU only).
  NVIDIA GPUs can use `hevc_nvenc`. On AMD GPUs use `hevc_amf`. `ffmpeg -encoders` will list all
  available encoders. Support will vary depending on your system and FFmpeg build.

- `-h, --hwaccel`: Hardware acceleration to use for video decoding. Default is none (CPU only).
  NVIDIA GPUs support `cuda` and `nvdec`. For AMD GPUs you can use `d3d11va` on Windows, otherwise
  check https://trac.ffmpeg.org/wiki/Hardware/AMF. To get a full list, run: `ffmpeg -hwaccels`.
  Support will vary depending on your system and FFmpeg build.

- `--no-metadata`: Remove all metadata from images and videos such as location, rotation, camera
  model, etc. Default is to preserve all metadata.

- `-q, --image-quality`: The quality of the output images. Default is 50%.

- `-v, --video-preset`: The preset for output videos, balancing speed vs compression quality. Default is `slow`.

## Motivation

I have a lot of old JPEG photos that needlessly take up quite a bit of space on my drives. Most of the
ones I care about are from 2011-2014, and each is 3264x2448 and takes up around 2 MB. Given their age,
they're already somewhat poor quality and compressing them further doesn't seem to make them any worse.

With this tool I've compressed around 80 GB of photos/videos down to 10 GB, and the results are
indistinguishable from the originals, at least to me.

## Example Output

```
$ bun compress --encoder hevc_nvenc --hwaccel nvdec ./test-input-dir/ ./test-output-dir/
Compressed test-input-dir/IMG_20130716_094609543.jpg. Original: 3.09 MB, Compressed: 718.86 KB (22.69%)
Compressed test-input-dir/IMG_20130715_054128493.jpg. Original: 4.21 MB, Compressed: 942.48 KB (21.85%)
Compressed test-input-dir/IMG_20130714_151902355.jpg. Original: 3.67 MB, Compressed: 846.77 KB (22.55%)
Compressed test-input-dir/IMG_20130715_100733984.jpg. Original: 5.32 MB, Compressed: 1.49 MB (28.11%)
Compressed test-input-dir/IMG_20130717_134230120.jpg. Original: 3.80 MB, Compressed: 711.78 KB (18.31%)
Compressed test-input-dir/IMG_20130714_143632554.jpg. Original: 3.70 MB, Compressed: 731.29 KB (19.31%)
Compressed test-input-dir/IMG_20130713_133357580.jpg. Original: 4.68 MB, Compressed: 1.02 MB (21.83%)
Compressed test-input-dir/GOPR6235.MP4. Original: 101.90 MB, Compressed: 21.68 MB (21.28%)
Compressed test-input-dir/IMG_20130714_072932455.jpg. Original: 4.30 MB, Compressed: 980.00 KB (22.27%)
Compressed test-input-dir/IMG_20130717_133925010.jpg. Original: 4.05 MB, Compressed: 990.53 KB (23.87%)
Compressed test-input-dir/IMG_20130716_065001589.jpg. Original: 4.21 MB, Compressed: 1.04 MB (24.60%)
Compressed test-input-dir/IMG_20130716_045134238.jpg. Original: 6.44 MB, Compressed: 1.63 MB (25.31%)
Compressed test-input-dir/IMG_20130714_052617273.jpg. Original: 5.62 MB, Compressed: 1.45 MB (25.81%)
Compressed 13 files. Original: 154.99 MB, Compressed: 34.10 MB (22.00%)
```
