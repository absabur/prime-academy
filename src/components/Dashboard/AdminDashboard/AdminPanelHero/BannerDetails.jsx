import { Card, CardContent } from '@/components/ui/card';
import SecondaryButton from '../../../common/SecondaryButton';
import PrimaryButton from '../../../common/PrimaryButton';

export default function BannerDetails({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {/* Banner Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img src={data.banner_image} alt={data.title} className="w-full h-60 object-cover" />
        <div className="absolute top-2 right-2">
          <div variant={data.is_active ? 'default' : 'secondary'}>
            {data.is_active ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <Card className="border-none shadow-none">
        <CardContent className="space-y-3 p-0">
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.description}</p>
        </CardContent>
      </Card>

      {/* Buttons (if any) */}
      {(data.button1_text || data.button2_text) && (
        <div className="flex flex-wrap gap-3">
          {data.button1_text && (
            <SecondaryButton
              href={data.button1_url}
              target="_blank"
              className="border-primary text-primary hover:text-white"
              text={data.button1_text}
            ></SecondaryButton>
          )}
          {data.button2_text && (
            <PrimaryButton
              href={data.button2_url}
              target="_blank"
              text={data.button2_text}
            ></PrimaryButton>
          )}
        </div>
      )}

      {/* Meta Info */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>
          <strong>Page:</strong> {data.page_name}
        </p>
        <p>
          <strong>ID:</strong> {data.id}
        </p>
      </div>
    </div>
  );
}
