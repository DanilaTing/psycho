class Board < ApplicationRecord
  after_create :check_type_and_create_columns

  belongs_to :project, optional: true
  belongs_to :user
  has_many :columns
  has_many :board_in_projects
  has_many :projects, through: :board_in_projects

  def check_type_and_create_columns
    create_general_columns  if name == 'General'
    create_inbox_and_done if general == true
    create_priority_columns if name == 'Priorities'
  end

  def create_general_columns
    columns = ['In Progress', 'Priority', 'To Do', 'Waiting', 'Someday']
    create_columns(columns)
  end

  def create_inbox_and_done
    columns = ['Done', 'Inbox']
    create_columns(columns)
  end

  def create_priority_columns
    columns = ['High', 'Middle', 'Low', 'None']
    create_columns(columns)
  end

  def create_columns(columns)
    columns.each_with_index do |c, i|
      self.columns.create(name: c, position: i)
    end
  end
end
