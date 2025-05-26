import React from 'react';
import { useFormContext } from '../../context/FormContext';

interface PerformanceRatingFormProps {
  onComplete?: () => void;
}

const PerformanceRatingForm: React.FC<PerformanceRatingFormProps> = ({ onComplete }) => {
  const { formData, updateFormData } = useFormContext();
  const { performanceRating = { last_year: { year: '', rating: '' }, second_last_year: { year: '', rating: '' }, third_last_year: { year: '', rating: '' } } } = formData;

  const handleLastYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData('performanceRating', {
      ...performanceRating,
      last_year: {
        ...performanceRating.last_year,
        [name]: value
      }
    });
  };

  const handleSecondLastYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData('performanceRating', {
      ...performanceRating,
      second_last_year: {
        ...performanceRating.second_last_year,
        [name]: value
      }
    });
  };

  const handleThirdLastYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData('performanceRating', {
      ...performanceRating,
      third_last_year: {
        ...performanceRating.third_last_year,
        [name]: value
      }
    });
  };

  // Generate year options for the last 10 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  
  // Rating options
  const ratingOptions = ['OP', 'SOP'];

  return (
    <div className="animate-slide-in">
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Performance Ratings</h3>
        <p className="text-blue-700 text-sm">
          Please provide your performance ratings for the last three years, if applicable.
          This information helps us understand your career progression and achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Last Year Performance */}
        <div>
          <h3 className="font-medium text-lg text-gray-900 mb-4 border-b pb-2">Last Year's Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="last_year" className="form-label">Year</label>
            <select
              id="last_year"
              name="year"
              value={performanceRating.last_year.year}
              onChange={handleLastYearChange}
              className="form-select"
            >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={`last-${year}`} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="last_rating" className="form-label">Rating</label>
            <select
              id="last_rating"
              name="rating"
              value={performanceRating.last_year.rating}
              onChange={handleLastYearChange}
              className="form-select"
            >
                <option value="">Select Rating</option>
                {ratingOptions.map(rating => (
                  <option key={`last-rating-${rating}`} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Second Last Year Performance */}
        <div>
          <h3 className="font-medium text-lg text-gray-900 mb-4 border-b pb-2">Second Last Year's Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="second_last_year" className="form-label">Year</label>
              <select
                id="second_last_year"
                name="year"
                value={performanceRating.second_last_year.year}
                onChange={handleSecondLastYearChange}
                className="form-select"
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={`second-${year}`} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="second_last_rating" className="form-label">Rating</label>
              <select
                id="second_last_rating"
                name="rating"
                value={performanceRating.second_last_year.rating}
                onChange={handleSecondLastYearChange}
                className="form-select"
              >
                <option value="">Select Rating</option>
                {ratingOptions.map(rating => (
                  <option key={`second-rating-${rating}`} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Third Last Year Performance */}
        <div>
          <h3 className="font-medium text-lg text-gray-900 mb-4 border-b pb-2">Third Last Year's Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="third_last_year" className="form-label">Year</label>
              <select
                id="third_last_year"
                name="year"
                value={performanceRating.third_last_year.year}
                onChange={handleThirdLastYearChange}
                className="form-select"
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={`third-${year}`} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="third_last_rating" className="form-label">Rating</label>
              <select
                id="third_last_rating"
                name="rating"
                value={performanceRating.third_last_year.rating}
                onChange={handleThirdLastYearChange}
                className="form-select"
              >
                <option value="">Select Rating</option>
                {ratingOptions.map(rating => (
                  <option key={`third-rating-${rating}`} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onComplete}
          className="btn btn-primary px-8"
        >
          Review All Information
        </button>
      </div>
    </div>
  );
};

export default PerformanceRatingForm;