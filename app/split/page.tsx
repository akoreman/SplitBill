import { Metadata } from 'next';
import BillSplitter from '../../components/BillSplitter';

export const metadata: Metadata = {
  title: 'Split Bill - Bill Splitter Tool',
  description: 'Split bills easily among friends. Calculate individual shares, tips, and payments with our advanced bill splitting calculator.',
};

export default function SplitPage() {
  return <BillSplitter />;
}