import { Suspense } from 'react';
import VerifyClient from './VerifyClient';

export const dynamic = "force-dynamic";

export default function VerifyPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading verification form...</div>}>
      <VerifyClient />
    </Suspense>
  );
}