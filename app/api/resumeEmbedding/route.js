import { NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';

let embedder = null;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true, // Optional: smaller model, faster inference
    });
  }
  return embedder;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const resume = body.resume;

    if (!resume || typeof resume !== 'string') {
      return NextResponse.json({ error: 'resume must be a string' }, { status: 400 });
    }

    const embedder = await getEmbedder();

    // Generate embedding with mean pooling and normalization (matches sentence-transformers)
    const embeddingResult = await embedder(resume, {
      pooling: 'mean',
      normalize: true,
    });

    // Extract the flat array from the Tensor (384 elements)
    const embedding = Array.from(embeddingResult.data);

    return NextResponse.json({ embedding });
  } catch (error) {
    console.error('Error generating embedding:', error);
    return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 });
  }
}