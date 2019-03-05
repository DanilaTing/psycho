class Attachment < ApplicationRecord
  def self.types
    %w(Image Video)
  end
end
