# Fix from https://github.com/heartcombo/devise/issues/5473 as rails api disables sessions, so this creates a fake session to bypass the error

module RackSessionsFix
    extend ActiveSupport::Concern
    class FakeRackSession < Hash
      def enabled?
        false
      end
      def destroy; end
    end
    included do
      before_action :set_fake_session
      private
      def set_fake_session
        request.env['rack.session'] ||= FakeRackSession.new
      end
    end
  end