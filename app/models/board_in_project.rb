class BoardInProject < ApplicationRecord
  belongs_to :board
  belongs_to :project
end
