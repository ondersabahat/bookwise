import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: config.env.imageKit.publicKey,
  privateKey: config.env.imageKit.privateKey,
  urlEndpoint: config.env.imageKit.urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
