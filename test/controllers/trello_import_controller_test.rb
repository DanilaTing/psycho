require 'test_helper'

class TrelloImportControllerTest < ActionDispatch::IntegrationTest
  test "should get import_board" do
    get trello_import_import_board_url
    assert_response :success
  end

end
