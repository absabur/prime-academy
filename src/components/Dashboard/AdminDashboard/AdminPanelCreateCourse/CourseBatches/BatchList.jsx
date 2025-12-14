import { Calendar, Edit2, Trash2, Users } from 'lucide-react';
import SecondaryButton from '../../../../common/SecondaryButton';

export default function BatchList({ batches, onEdit, onDelete, loading }) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!batches || batches.length === 0) {
        return (
            <div className="bg-white p-lg rounded-lg shadow-around-sm text-center py-xl">
                <p className="text-gray-500 text-lg">No batches created yet. Create your first batch to get started!</p>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'ongoing':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-md">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-lg shadow-around-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-md py-sm text-left">Batch Name</th>
                            <th className="px-md py-sm text-left">Number</th>
                            <th className="px-md py-sm text-left">Start Date</th>
                            <th className="px-md py-sm text-left">End Date</th>
                            <th className="px-md py-sm text-left">Enrollment</th>
                            <th className="px-md py-sm text-left">Seats</th>
                            <th className="px-md py-sm text-left">Status</th>
                            <th className="px-md py-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batches.map((batch, index) => (
                            <tr
                                key={batch.id || index}
                                className="border-b border-black/10 hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-md py-sm font-medium">{batch.batch_name}</td>
                                <td className="px-md py-sm">{batch.batch_number}</td>
                                <td className="px-md py-sm">
                                    <div className="flex items-center gap-xs text-sm">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        {formatDate(batch.start_date)}
                                    </div>
                                </td>
                                <td className="px-md py-sm">
                                    <div className="flex items-center gap-xs text-sm">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        {formatDate(batch.end_date)}
                                    </div>
                                </td>
                                <td className="px-md py-sm">
                                    <div className="text-sm">
                                        <div>{formatDate(batch.enrollment_start_date)}</div>
                                        <div className="text-gray-500">to {formatDate(batch.enrollment_end_date)}</div>
                                    </div>
                                </td>
                                <td className="px-md py-sm">
                                    <div className="flex items-center gap-xs">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <span className={batch.available_seats <= 10 ? 'text-red-600 font-semibold' : ''}>
                                            {batch.available_seats || 0}{batch.max_seats ? `/${batch.max_seats}` : ''}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-md py-sm">
                                    <span
                                        className={`px-sm py-xs rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}
                                    >
                                        {batch.status}
                                    </span>
                                    {batch.is_enrollment_open && (
                                        <span className="ml-xs px-sm py-xs rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Open
                                        </span>
                                    )}
                                </td>
                                <td className="px-md py-sm">
                                    <div className="flex justify-center gap-xs">
                                        <button
                                            onClick={() => onEdit(batch)}
                                            className="p-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            title="Edit Batch"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(batch)}
                                            className="p-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Delete Batch"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-md">
                {batches.map((batch, index) => (
                    <div
                        key={batch.id || index}
                        className="bg-white p-md rounded-lg shadow-around-sm space-y-sm"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{batch.batch_name}</h3>
                                <p className="text-sm text-gray-500">Batch #{batch.batch_number}</p>
                            </div>
                            <div className="flex gap-xs">
                                <span
                                    className={`px-sm py-xs rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}
                                >
                                    {batch.status}
                                </span>
                                {batch.is_enrollment_open && (
                                    <span className="px-sm py-xs rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Open
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-xs text-sm">
                            <div className="flex items-center gap-xs">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">
                                    {formatDate(batch.start_date)} - {formatDate(batch.end_date)}
                                </span>
                            </div>
                            <div className="flex items-center gap-xs">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className={batch.available_seats <= 10 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                                    {batch.available_seats || 0}{batch.max_seats ? `/${batch.max_seats}` : ''} seats available
                                </span>
                            </div>
                        </div>

                        <div className="pt-sm border-t border-black/10 flex justify-end gap-sm">
                            <SecondaryButton
                                onClick={() => onEdit(batch)}
                                text="Edit"
                                minWidth="fit"
                                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            />
                            <SecondaryButton
                                onClick={() => onDelete(batch)}
                                text="Delete"
                                minWidth="fit"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
