class Card < ApplicationRecord
  def self.types
    %w(Task Project)
  end
end
