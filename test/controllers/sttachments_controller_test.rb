require 'test_helper'

class SttachmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sttachment = sttachments(:one)
  end

  test "should get index" do
    get sttachments_url
    assert_response :success
  end

  test "should get new" do
    get new_sttachment_url
    assert_response :success
  end

  test "should create sttachment" do
    assert_difference('Sttachment.count') do
      post sttachments_url, params: { sttachment: { type: @sttachment.type } }
    end

    assert_redirected_to sttachment_url(Sttachment.last)
  end

  test "should show sttachment" do
    get sttachment_url(@sttachment)
    assert_response :success
  end

  test "should get edit" do
    get edit_sttachment_url(@sttachment)
    assert_response :success
  end

  test "should update sttachment" do
    patch sttachment_url(@sttachment), params: { sttachment: { type: @sttachment.type } }
    assert_redirected_to sttachment_url(@sttachment)
  end

  test "should destroy sttachment" do
    assert_difference('Sttachment.count', -1) do
      delete sttachment_url(@sttachment)
    end

    assert_redirected_to sttachments_url
  end
end
