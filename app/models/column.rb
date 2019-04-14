class Column < ApplicationRecord
  has_many :card_in_columns
  has_many :tasks,    through: :card_in_columns, source: :columnable, source_type: 'Task'
  has_many :projects, through: :card_in_columns, source: :columnable, source_type: 'Project'
  belongs_to :board
end
