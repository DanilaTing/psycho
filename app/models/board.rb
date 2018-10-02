class Board < ApplicationRecord
  belongs_to :project, optional: true
  has_many :columns
end
