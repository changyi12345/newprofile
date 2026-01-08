import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
    try {
        await connectDB();
        const projects = await Project.find();
        return NextResponse.json({ success: true, count: projects.length, data: projects });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
