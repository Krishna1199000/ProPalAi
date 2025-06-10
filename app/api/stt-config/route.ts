import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // Changed to named import

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const userId = session.user.id;
  const { provider, model, language } = await req.json();

  if (!provider || !model || !language) {
    return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const existingConfig = await prisma.sttConfiguration.findUnique({
      where: { userId: userId },
    });

    if (existingConfig) {
      // Update existing configuration
      const updatedConfig = await prisma.sttConfiguration.update({
        where: { id: existingConfig.id },
        data: { provider, model, language },
      });
      return NextResponse.json(updatedConfig);
    } else {
      // Create new configuration
      const newConfig = await prisma.sttConfiguration.create({
        data: {
          userId: userId,
          provider: provider,
          model: model,
          language: language,
        },
      });
      return NextResponse.json(newConfig);
    }
  } catch (error) {
    console.error('[STT_CONFIG_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const userId = session.user.id;

  try {
    const config = await prisma.sttConfiguration.findUnique({
      where: { userId: userId },
    });
    return NextResponse.json(config);
  } catch (error) {
    console.error('[STT_CONFIG_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 