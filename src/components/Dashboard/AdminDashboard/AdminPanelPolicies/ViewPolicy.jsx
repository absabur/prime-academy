import DOMPurify from 'dompurify';
import { Card, CardContent } from '@/components/ui/card';

const ViewPolicy = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{data.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Page: <span className="font-medium text-gray-700">{data.page_name}</span>
          </p>
        </div>
        <div variant="outline" className="text-xs px-3 py-1">
          POLICY
        </div>
      </div>

      {/* Content */}
      <Card className="border-none shadow-sm bg-gray-50">
        <CardContent className="p-4">
          <div
            className="policy-wrapper text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.content),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewPolicy;
