require 'active_support/concern'

module ImageUpload
	extend ActiveSupport::Concern
	include Rails.application.routes.url_helpers
	included do
		STANDARD_SIZES = [
				[1280, 720],
				[460, 308],
				[220, 148],
				[60, 40]
		]

		def resized_images(image)
			return {}
			return {} unless image.attached?
			STANDARD_SIZES.inject({}) do |memo, size|
				key = "#{size[0]}x#{size[1]}"
				memo[key] = rails_representation_url(image.variant(resize_to_limit: size).processed, only_path: true)
				memo
			end
		end

		def acceptable_image
			return unless avatar_image.attached?

			unless avatar_image.byte_size <= 1.megabyte
				errors.add(:avatar_image, "is too big")
			end

			acceptable_image_types = ["image/jpeg", "image/png", "images/jpg"]
			unless acceptable_image_types.include?(avatar_image.content_type)
				errors.add(:avatar_image, "must be a JPEG or PNG or JPG")
			end
		end
	end
end
