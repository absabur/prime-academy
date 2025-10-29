import { Card, CardContent } from '@/components/ui/card';
import { MdVerified } from 'react-icons/md';

export default function MessageDetails({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {data.first_name} {data.last_name}
        </h2>
        {data.agree_to_policy ? (
          <div className='flex gap-xs items-center'>
            <MdVerified className="text-xl text-primary-light" /> Policy Agreed
          </div>
        ) : (
          <div>Not Agreed</div>
        )}
      </div>

      {/* Contact Info */}
      <Card className="border-none shadow-none">
        <CardContent className="space-y-2 p-0">
          <p>
            <strong>Email:</strong> <span className="text-gray-700">{data.email}</span>
          </p>
          <p>
            <strong>Phone:</strong> <span className="text-gray-700">{data.phone}</span>
          </p>
        </CardContent>
      </Card>

      {/* Message Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Message</h3>
        <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-line leading-relaxed">
          {data.message}
        </div>
      </div>

      {/* Metadata */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>
          <strong>ID:</strong> {data.id}
        </p>
      </div>
    </div>
  );
}
