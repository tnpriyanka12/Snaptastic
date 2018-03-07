class Comment < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :snap, optional: true
end
