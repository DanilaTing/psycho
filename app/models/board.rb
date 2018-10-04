class Board < ApplicationRecord
  belongs_to :project, optional: true
  has_many :columns
  has_many :board_in_projects
  has_many :projects, through: :board_in_projects
end
