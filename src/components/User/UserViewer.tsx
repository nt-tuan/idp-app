import { Tabs, Tab, Icon, Button } from "@blueprintjs/core";
import { Spinner, Header } from "components/utils";
import { ErrorMessage } from "components/utils/ErrorMessage";
import { UserRolesEditor } from "components/user/UserRolesEditor";
import React from "react";
import Avatar from "react-avatar";
import { RequestError } from "resources/apis/api";
import { IRole } from "resources/models/role";
import { IUser, UserSignInLog } from "resources/models/user";
import { EditingUserInfo, UserInfoEditor } from "./UserInfoEditor";
import { Stack } from "components/utils/Stack";
import UAParser from "ua-parser-js";
import { Consent } from "resources/models/consent";
import moment from "moment";
import cx from "classnames";

interface Props {
  allRoles: IRole[];
  userRoles: string[];
  user: IUser;
  extrasGeneral?: React.ReactNode;
  extrasRoles?: React.ReactNode;
  onRevoked?: (role: string) => void;
  onGranted?: (role: string) => void;
  onChange?: (user: IUser) => void;
  onSave?: () => void;
  onCancel?: () => void;
  editingUser?: EditingUserInfo;
  error?: RequestError;
  accessLogs?: UserSignInLog[];
  sessionConsents?: Consent.ConsentSession[];
  onSessionRevoke?: (clientId: string) => void;
}
const Field = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-row items-baseline">
    <div className="w-32">{label}</div>
    {value ? (
      <div className="font-bold">{value}</div>
    ) : (
      <i className="text-gray-500">(Không có)</i>
    )}
  </div>
);
const GeneralInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="flex flex-col justify-center items-center">
        <Avatar name={user.username} src={user.image} round />
      </div>
      <div className="flex flex-col justify-center pl-4 pt-4 lg:pt-0">
        <div className="font-bold">ID {user.id}</div>
        <Field label="Tài khoản" value={user.username} />
        <Field label="Họ tên" value={user.fullname} />
        <Field label="Email" value={user.email} />
        <Field label="Phone" value={user.phone} />
      </div>
    </div>
  );
};

const joinStrings = (...s: (string | undefined)[]) => {
  let r: string | undefined = undefined;
  for (let i = 0; i < s.length; i++) {
    if (s[i] != null) {
      r = r ? r + "/" : "" + s[i];
    }
  }
  return r;
};
const AccessLog = ({
  accessInfo,
  sessions,
  onRevoke,
}: {
  accessInfo: UserSignInLog;
  sessions: Consent.ConsentSession[];
  onRevoke?: (clientID: string) => void;
}) => {
  const data = React.useMemo(() => {
    const { ipAddress } = accessInfo;
    const parser = new UAParser(accessInfo.userAgent);
    const { device, os, browser, engine, cpu } = parser.getResult();
    const deviceInfo = joinStrings(device.type, device.model, device.vendor);
    return { deviceInfo, os, browser, ipAddress, engine, cpu };
  }, [accessInfo]);
  const matchSessions = sessions.filter(
    (s) => s.consent_request.challenge === accessInfo.consentChallenge
  );
  return (
    <div
      className={cx(
        "group px-2 py-1 border rounded relative",
        matchSessions.length > 0 ? "border-green-500" : "bg-gray-300"
      )}
    >
      <Stack className="w-full break-all" type="vertical">
        <Stack spacing={4}>
          <Icon icon="ip-address" />
          <span>{data.ipAddress ?? "-"}</span>
        </Stack>

        <Stack type="horizontal" spacing={4}>
          <Icon icon="desktop" />
          <Stack className="flex-wrap" type="horizontal" spacing={2}>
            {data.deviceInfo && <span>{data.deviceInfo}</span>}
            {data.engine && (
              <span>
                {data.engine.name}/{data.engine.version}
              </span>
            )}
            {data.os && (
              <span>
                {data.os.name}/{data.os.version}
              </span>
            )}
            {data.cpu && <span>{data.cpu.architecture}</span>}
          </Stack>
        </Stack>

        <Stack type="horizontal" spacing={4}>
          <Icon icon="globe" />
          <span>
            {data.browser.name}/{data.browser.version}
          </span>
        </Stack>
        {accessInfo.acceptedConsentAt && (
          <Stack spacing={4}>
            <Icon icon="time" />
            <span>{moment(accessInfo.acceptedConsentAt).format("LLLL")}</span>
          </Stack>
        )}
      </Stack>
      {matchSessions.length > 0 && onRevoke && (
        <div className="absolute right-2 top-2 opacity-50 group-hover:opacity-100">
          <Button
            icon="log-out"
            onClick={() =>
              onRevoke(matchSessions[0].consent_request.client.client_id)
            }
          >
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  );
};
interface AccessLogProp {
  accessLogs?: UserSignInLog[];
  sessionConsents?: Consent.ConsentSession[];
  onSessionRevoke?: (clientId: string) => void;
}
const MyAccessLogs = (props: AccessLogProp) => {
  if (props.accessLogs == null) return <Spinner />;
  if (props.sessionConsents == null) return <Spinner />;
  if (props.accessLogs.length === 0)
    return <i>Không có thông tin truy cập của tài khoản này</i>;
  return (
    <Stack type="vertical" spacing={4}>
      {props.accessLogs.map((log, index) => (
        <AccessLog
          onRevoke={props.onSessionRevoke}
          sessions={props.sessionConsents ?? []}
          key={index}
          accessInfo={log}
        />
      ))}
    </Stack>
  );
};

const UserViewMobile = (props: Props) => {
  const [selectedTabId, setSelectedTabId] = React.useState<React.ReactText>(
    "general"
  );
  const extras = React.useMemo(() => {
    if (selectedTabId === "general") return props.extrasGeneral;
    if (selectedTabId === "roles") return props.extrasRoles;
    return <></>;
  }, [props, selectedTabId]);
  return (
    <>
      {props.error && <ErrorMessage {...props.error} />}
      <Tabs
        selectedTabId={selectedTabId}
        onChange={(newTab) => setSelectedTabId(newTab)}
      >
        <Tab
          title="Chung"
          id="general"
          panel={
            props.editingUser && props.onChange ? (
              <UserInfoEditor
                user={props.editingUser}
                onChange={props.onChange}
                onSave={props.onSave}
                onCancel={props.onCancel}
              />
            ) : (
              <GeneralInfo {...props} />
            )
          }
        />
        <Tab
          title="Vai trò"
          id="roles"
          panel={
            <UserRolesEditor
              allRoles={props.allRoles}
              roles={props.user.roles}
              onGranted={props.onGranted}
              onRevoked={props.onRevoked}
            />
          }
        />
        <Tab
          title="Truy cập"
          id="access"
          panel={
            <MyAccessLogs
              accessLogs={props.accessLogs}
              sessionConsents={props.sessionConsents}
              onSessionRevoke={props.onSessionRevoke}
            />
          }
        />
        <Tabs.Expander />
        {extras}
      </Tabs>
    </>
  );
};

export const UserViewDesktop = (props: Props) => {
  return (
    <>
      <div className="flex flex-row flex-wrap xl:divide-x">
        <div className="flex flex-col w-full pb-10 xl:w-1/2 xl:pr-4 xl:pb-0">
          <Header extras={props.extrasGeneral}>Thông tin chung</Header>
          <div className="flex-1">
            {props.onChange && props.editingUser ? (
              <UserInfoEditor
                user={props.editingUser}
                onChange={props.onChange}
              />
            ) : (
              <GeneralInfo {...props} />
            )}
          </div>
        </div>

        <div className="flex flex-col w-full xl:w-1/2 xl:pl-4">
          <Header extras={props.extrasRoles}>Vai trò</Header>
          <div className="flex-1 overflow-y-auto">
            <UserRolesEditor
              allRoles={props.allRoles}
              roles={props.userRoles}
              onGranted={props.onGranted}
              onRevoked={props.onRevoked}
            />
          </div>
        </div>
      </div>
      <div className="w-full pt-10">
        <Header>Lịch sử truy cập</Header>
        <div>
          <MyAccessLogs
            accessLogs={props.accessLogs}
            sessionConsents={props.sessionConsents}
            onSessionRevoke={props.onSessionRevoke}
          />
        </div>
      </div>
    </>
  );
};

export const UserViewer = (props: Props) => {
  return (
    <>
      {props.error && <ErrorMessage {...props.error} />}
      <div className="block sm:hidden">
        <UserViewMobile {...props} />
      </div>
      <div className="hidden sm:block">
        <UserViewDesktop {...props} />
      </div>
    </>
  );
};
