class Snap < ApplicationRecord
  belongs_to :user, optional: true
end
