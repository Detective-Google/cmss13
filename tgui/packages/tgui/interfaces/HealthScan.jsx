import { useBackend } from '../backend';
import {
  Blink,
  Box,
  Button,
  ColorBox,
  Divider,
  DmIcon,
  Flex,
  Icon,
  LabeledList,
  NoticeBox,
  ProgressBar,
  Section,
  Stack,
} from '../components';
import { Window } from '../layouts';

export const HealthScan = (props) => {
  const { act, data } = useBackend();
  const {
    patient,
    detail_level,
    species,
    has_chemicals,
    diseases,
    advice,
    limbs_damaged,
    damaged_organs,
    ui_mode,
    damage_icon,
  } = data;

  const bodyscanner = detail_level >= 1;
  const Synthetic = species === 'Synthetic';
  const theme = Synthetic ? 'hackerman' : bodyscanner ? 'ntos' : 'default';

  return (
    <Window
      width={ui_mode ? 320 : 500}
      height={bodyscanner ? 700 : 647}
      theme={theme}
      title={'Patient: ' + patient}
    >
      <Window.Content scrollable>
        <Patient />
        <ScannerLimbs />

        {diseases ? <Diseases /> : null}
        <Stack vertical>
          {has_chemicals ? (
            <Stack.Item width="35%">
              <ScannerChems />
            </Stack.Item>
          ) : null}

          {!ui_mode ? (
            <Stack.Item fill>
              <MedicalAdvice />{' '}
            </Stack.Item>
          ) : null}
        </Stack>

        {damaged_organs?.length && bodyscanner ? <ScannerOrgans /> : null}
      </Window.Content>
    </Window>
  );
};

const Patient = (props) => {
  const { act, data } = useBackend();
  const {
    patient_mob,
    patient,
    dead,
    health,
    total_brute,
    total_burn,
    toxin,
    oxy,
    clone,
    ui_mode,

    has_chemicals,
    limbs_damaged,

    damaged_organs,
    ssd,

    diseases,

    blood_type,
    blood_amount,
    has_blood,
    body_temperature,
    pulse,
    implants,
    core_fracture,
    lung_ruptured,
    hugged,
    detail_level,
    permadead,
    heart_broken,
    advice,
    species,
    holocard,
  } = data;

  let holocard_message;
  if (holocard === 'red') {
    holocard_message = 'Patient needs life-saving treatment.';
  } else if (holocard === 'orange') {
    holocard_message = 'Patient needs non-urgent surgery.';
  } else if (holocard === 'purple') {
    holocard_message = 'Patient is infected with an XX-121 embryo.';
  } else if (holocard === 'black') {
    holocard_message = 'Patient is permanently deceased.';
  } else {
    holocard_message = 'Patient has no active holocard.';
  }

  const ghostscan = detail_level >= 2;
  const Synthetic = species === 'Synthetic';

  return (
    <Section>
      {hugged && ghostscan ? (
        <NoticeBox danger>
          Patient has been implanted with an alien embryo!
        </NoticeBox>
      ) : null}
      {dead ? <NoticeBox danger>Patient is deceased!</NoticeBox> : null}
      {ssd ? (
        <NoticeBox warning color="grey">
          {ssd}
        </NoticeBox>
      ) : null}

      {ui_mode ? (
        <Stack vertical>
          {dead ? (
            <Stack.Item>
              <Stack>
                <Stack.Item>Condition:</Stack.Item>
                <Stack.Item>
                  <Box color={permadead ? 'red' : 'green'} bold={1}>
                    {permadead
                      ? heart_broken
                        ? 'Myocardial rupture, surgical intervention required'
                        : 'Permanently deceased'
                      : Synthetic
                        ? 'Central power system shutdown, reboot with a reset key possible'
                        : 'Cardiac arrest, defibrillation possible'}
                  </Box>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          ) : null}
          <Stack.Item>
            <Stack>
              <Stack.Item>Damage:</Stack.Item>
              <Stack.Item>
                <Box inline bold color={'red'} mr={1}>
                  {total_brute}
                </Box>
              </Stack.Item>
              <Stack.Item>
                <Box inline bold color={'#ffb833'} mx={1}>
                  {total_burn}
                </Box>
              </Stack.Item>
              <Stack.Item>
                <Box inline bold color={'green'} mx={1}>
                  {toxin}
                </Box>
              </Stack.Item>
              <Stack.Item>
                <Box inline bold color={'blue'} mx={1}>
                  {oxy}
                </Box>
              </Stack.Item>
              {!!clone && (
                <Box inline bold color={'teal'} mx={1}>
                  {clone}
                </Box>
              )}
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack>
              <Stack.Item>Holocard:</Stack.Item>
              {holocard ? (
                <Stack.Item>
                  <ColorBox color={holocard} />
                </Stack.Item>
              ) : (
                <Stack.Item>
                  <Icon name="x" />
                </Stack.Item>
              )}
              <Stack.Item>
                <Box
                  inline
                  onClick={() => act('change_holo_card')}
                  backgroundColor="rgba(255, 255, 255, .05)"
                >
                  Change
                </Box>
              </Stack.Item>
              <Stack.Item>
                <Box
                  inline
                  onClick={() => act('change_ui_mode')}
                  backgroundColor="rgba(255, 255, 255, .05)"
                >
                  Classic UI
                </Box>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      ) : (
        <LabeledList>
          <LabeledList.Item label="Health">
            {health >= 0 ? (
              <ProgressBar
                value={health / 100}
                ranges={{
                  good: [0.7, Infinity],
                  average: [0.2, 0.7],
                  bad: [-Infinity, 0.2],
                }}
              >
                {health}% healthy
              </ProgressBar>
            ) : (
              <ProgressBar
                value={1 + health / 100}
                ranges={{
                  bad: [-Infinity, Infinity],
                }}
              >
                {health}% healthy
              </ProgressBar>
            )}
          </LabeledList.Item>
          {dead ? (
            <LabeledList.Item label="Condition">
              <Box color={permadead ? 'red' : 'green'} bold={1}>
                {permadead
                  ? heart_broken
                    ? 'Myocardial rupture, surgical intervention required'
                    : 'Permanently deceased'
                  : Synthetic
                    ? 'Central power system shutdown, reboot with a reset key possible'
                    : 'Cardiac arrest, defibrillation possible'}
              </Box>
            </LabeledList.Item>
          ) : null}
          <LabeledList.Item label="Damage">
            <Box inline>
              <ProgressBar>
                Brute:{' '}
                <Box inline bold color={'red'}>
                  {total_brute}
                </Box>
              </ProgressBar>
            </Box>
            <Box inline width={'5px'} />
            <Box inline>
              <ProgressBar>
                Burn:{' '}
                <Box inline bold color={'#ffb833'}>
                  {total_burn}
                </Box>
              </ProgressBar>
            </Box>
            <Box inline width={'5px'} />
            <Box inline>
              <ProgressBar>
                Toxin:{' '}
                <Box inline bold color={'green'}>
                  {toxin}
                </Box>
              </ProgressBar>
            </Box>
            <Box inline width={'5px'} />
            <Box inline>
              <ProgressBar>
                Oxygen:{' '}
                <Box inline bold color={'blue'}>
                  {oxy}
                </Box>
              </ProgressBar>
            </Box>
            <Box inline width={'5px'} />
            {!!clone && (
              <Box inline>
                <ProgressBar>
                  Clone:{' '}
                  <Box inline color={'teal'}>
                    {clone}
                  </Box>
                </ProgressBar>
              </Box>
            )}
          </LabeledList.Item>
          <LabeledList.Item label="Holocard">
            <NoticeBox color={holocard} inline>
              {holocard_message}
            </NoticeBox>

            <Button
              inline
              style={{ marginLeft: '2%' }}
              onClick={() => act('change_holo_card')}
            >
              Change
            </Button>

            <Button inline onClick={() => act('change_ui_mode')}>
              Minimal UI
            </Button>
          </LabeledList.Item>
        </LabeledList>
      )}
    </Section>
  );
};

const Misc = (props) => {
  const { data } = useBackend();
  const {
    blood_type,
    blood_amount,
    has_blood,
    body_temperature,
    pulse,
    implants,
    core_fracture,
    lung_ruptured,
    hugged,
    detail_level,
    ui_mode,
  } = data;
  const bloodpct = blood_amount / 560;
  const healthanalyser = detail_level < 1;
  const bodyscanner = detail_level >= 1;
  return (
    <Box mt="10px">
      {implants && detail_level !== 1 ? (
        <NoticeBox danger>
          {implants && !ui_mode} embedded object{implants > 1 ? 's' : ''}{' '}
          detected!
          {healthanalyser ? ' Advanced scanner required for location.' : null}
        </NoticeBox>
      ) : null}
      {(implants || hugged) && detail_level === 1 ? (
        <NoticeBox danger>
          {implants + (hugged ? 1 : 0)} unknown bod
          {implants + (hugged ? 1 : 0) > 1 ? 'ies' : 'y'} detected!
        </NoticeBox>
      ) : null}
      {lung_ruptured && bodyscanner ? (
        <NoticeBox danger>Ruptured lung detected!</NoticeBox>
      ) : null}
      {core_fracture && healthanalyser ? (
        <NoticeBox danger>
          Bone fractures detected!
          {!ui_mode ? ' Advanced scanner required for location.' : null}
        </NoticeBox>
      ) : null}
    </Box>
  );
};

const Diseases = (props) => {
  const { data } = useBackend();
  const { diseases } = data;
  return (
    <Section title="Diseases">
      <LabeledList>
        {diseases.map((disease) => (
          <LabeledList.Item
            key={disease.name}
            label={disease.name[0].toUpperCase() + disease.name.slice(1)}
          >
            <Box inline bold={1}>
              Type : {disease.type}, possible cure : {disease.cure}
            </Box>
            <Box inline width={'5px'} />
            <Box inline>
              <ProgressBar
                width="200px"
                value={disease.stage / disease.max_stage}
                ranges={{
                  good: [-Infinity, 20],
                  average: [20, 50],
                  bad: [50, Infinity],
                }}
              >
                Stage:{disease.stage}/{disease.max_stage}
              </ProgressBar>
            </Box>
          </LabeledList.Item>
        ))}
      </LabeledList>
    </Section>
  );
};

const MedicalAdvice = (props) => {
  const { data } = useBackend();
  const { advice } = data;
  return (
    <Section title="Medication Advice" fill>
      <Stack vertical minHeight="55px">
        {advice
          ? advice.map((advice) => (
              <Stack.Item key={advice.advice}>
                <Box inline>
                  <Icon name={advice.icon} ml={0.2} color={advice.color} />
                  <Box inline width={'5px'} />
                  {advice.advice}
                </Box>
              </Stack.Item>
            ))
          : null}
      </Stack>
    </Section>
  );
};

const ScannerChems = (props) => {
  const { data } = useBackend();
  const { has_unknown_chemicals, chemicals_lists, ui_mode } = data;
  const chemicals = Object.values(chemicals_lists);

  return (
    <Section title={ui_mode ? null : 'Chemical Contents'} fill>
      {has_unknown_chemicals ? (
        <NoticeBox warning color="grey">
          Unknown reagents detected.
        </NoticeBox>
      ) : null}
      <Stack vertical>
        {chemicals.map((chemical) => (
          <Stack.Item key={chemical.name}>
            <Box inline>
              <Icon name={'flask'} ml={0.2} color={chemical.color} />
              <Box inline width={'5px'} />
              <Box
                inline
                color={chemical.dangerous ? 'red' : 'white'}
                bold={chemical.dangerous}
              >
                {chemical.amount + 'u ' + chemical.name}
              </Box>
              <Box inline width={'5px'} />
              {chemical.od ? (
                <Box inline color={'red'} bold={1}>
                  {'OD'}
                </Box>
              ) : null}
            </Box>
          </Stack.Item>
        ))}
      </Stack>
    </Section>
  );
};

const ScannerLimbs = (props) => {
  const { data } = useBackend();
  const {
    limb_data_lists,
    detail_level,
    ui_mode,
    damage_icon,
    health,
    patient,
    has_blood,
    blood_type,
    blood_amount,
    body_temperature,
    pulse,
    implants,
    hugged,
    core_fracture,
    lung_ruptured,
  } = data;
  const bloodpct = blood_amount / 560;
  const limb_data = Object.values(limb_data_lists);
  const bodyscanner = detail_level >= 1;

  const LimbHeight = (a, b) => {
    a = a.id;
    b = b.id;
    const LimbPriority = {
      chest: 6,
      r_arm: 5,
      l_arm: 4,
      r_leg: 3,
      l_leg: 2,
      groin: 1,
    };
    let valueA = LimbPriority[a];
    let valueB = LimbPriority[b];

    if (!valueA && !valueB) return 0; // They're both unknown
    if (!valueA) return 1; // B is defined but A is not
    if (!valueB) return -1; // A is defined but B is not

    if (valueA > valueB) return -1; // A is more important
    if (valueA < valueB) return 1; // B is more important

    return 0; // They're equal
  };

  let index = 0;
  const row_bg_color = 'rgba(255, 255, 255, .05)';

  limb_data.forEach((limb) => {
    limb.unbandaged = !limb.bandaged && limb.brute > 0 && !limb.limb_type;
    limb.unsalved = !limb.salved && limb.burn > 0 && !limb.limb_type;
  });

  return (
    <Section title={ui_mode ? null : 'Health Report - ' + patient}>
      <Stack horizontal>
        <Stack.Item width="40%" ml="2%">
          <Stack vertical mt="-8px" align="center" width="100%">
            <Stack.Item>
              <DmIcon
                icon="icons/mob/hud/screen_gen.dmi"
                icon_state="healthdoll_OVERLAY"
                width="320px"
                mb="-10.3px"
              />
            </Stack.Item>
            {limb_data.sort(LimbHeight).map((limb, index) => (
              <Stack.Item key={limb.name} mb="-20px" mt="5.4px">
                <Box className="icon">
                  <DmIcon
                    icon="icons/mob/hud/screen_gen.dmi"
                    icon_state={
                      limb.id +
                      (!limb.missing
                        ? limb.burn + limb.brute >= 50
                          ? '5'
                          : Math.round((limb.burn + limb.brute) / 10)
                        : '6')
                    }
                    width="320px"
                    height="320px"
                    mt="-320px"
                  />
                </Box>
              </Stack.Item>
            ))}
            <Blink>
              {limb_data.sort(LimbHeight).map((limb, index) => (
                <Stack.Item key={limb.name} mb="-20px" mt="5.3px">
                  <Box className="icon">
                    <DmIcon
                      icon="icons/mob/hud/screen_gen.dmi"
                      icon_state={
                        limb.id + (!limb.missing && limb.limb_status && '8')
                      }
                      width="320px"
                      opacity="0.25"
                      height="320px"
                      mt="-320px"
                    />
                  </Box>
                </Stack.Item>
              ))}
            </Blink>
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack vertical height={(health >= 100 ? 120 : 235) + 'px'}>
            {ui_mode ? null : health >= 100 ? null : (
              <Flex width="100%" height="20px">
                <Flex.Item basis="85px" />
                <Flex.Item basis="55px" bold color="red">
                  Brute
                </Flex.Item>
                <Flex.Item basis="55px" bold color="#ffb833">
                  Burn
                </Flex.Item>
              </Flex>
            )}
            {limb_data.map((limb) => (
              <Flex
                key={limb.name}
                width="100%"
                minHeight="15px"
                py="3px"
                backgroundColor={index++ % 2 === 0 ? row_bg_color : ''}
              >
                <Flex.Item basis="85px" shrink="0" bold pl="3px">
                  {limb.name[0].toUpperCase() + limb.name.slice(1)}
                </Flex.Item>
                {limb.missing ? (
                  <Flex.Item color={'red'} bold={1}>
                    MISSING
                  </Flex.Item>
                ) : (
                  <>
                    <Flex.Item basis="fit-content" shrink="0">
                      <Box
                        inline
                        width="50px"
                        color={limb.brute > 0 ? 'red' : 'white'}
                      >
                        {limb.unbandaged ? `{${limb.brute}}` : `${limb.brute}`}
                      </Box>
                      <Box
                        inline
                        width="40px"
                        color={limb.burn > 0 ? '#ffb833' : 'white'}
                      >
                        {limb.unsalved ? `{${limb.burn}}` : `${limb.burn}`}
                      </Box>
                    </Flex.Item>
                    <Flex.Item shrink="1">
                      {limb.bleeding ? (
                        <Box inline color={'red'} bold={1}>
                          {ui_mode ? `[B]` : `[Bleeding]`}
                        </Box>
                      ) : null}
                      {limb.internal_bleeding ? (
                        <Box inline color={'red'} bold={1}>
                          {ui_mode ? `[IB]` : `[Internal Bleeding]`}
                        </Box>
                      ) : null}
                      {limb.limb_status ? (
                        <Box inline color="white" bold={1}>
                          {ui_mode ? '[F]' : `[${limb.limb_status}]`}
                        </Box>
                      ) : null}
                      {limb.limb_splint ? (
                        <Box inline color={'lime'} bold={1}>
                          {ui_mode ? '[S]' : `[${limb.limb_splint}]`}
                        </Box>
                      ) : null}
                      {limb.limb_type ? (
                        <Box
                          inline
                          color={
                            limb.limb_type === 'Nonfunctional Cybernetic'
                              ? 'red'
                              : 'green'
                          }
                          bold={1}
                        >
                          {ui_mode ? '[C]' : `[${limb.limb_type}]`}
                        </Box>
                      ) : null}
                      {limb.open_incision ? (
                        <Box inline color={'red'} bold={1}>
                          {ui_mode ? `[OSI]` : `[Open Surgical Incision]`}
                        </Box>
                      ) : null}
                      {limb.implant && bodyscanner ? (
                        <Box inline color={'white'} bold={1}>
                          {ui_mode ? `[E]` : `[Embedded Object]`}
                        </Box>
                      ) : null}
                      {limb.open_zone_incision ? (
                        <Box inline color={'red'} bold={1}>
                          [Open Surgical Incision In {limb.open_zone_incision}]
                          {ui_mode
                            ? `[OSI:${limb.open_zone_incision}]`
                            : `[Open Surgical Incision In ${limb.open_zone_incision}]`}
                        </Box>
                      ) : null}
                    </Flex.Item>
                  </>
                )}
              </Flex>
            ))}
          </Stack>
          {health >= 100 ? null : <Divider />}
          <Stack.Item fill mt="10px" mb="5px">
            <LabeledList>
              {has_blood ? (
                <LabeledList.Item label={'Blood Type ' + blood_type}>
                  <Box
                    color={
                      bloodpct > 0.9
                        ? 'green'
                        : bloodpct > 0.7
                          ? 'orange'
                          : 'red'
                    }
                  >
                    {Math.round(blood_amount / 5.6)}%, {blood_amount}cl
                  </Box>
                </LabeledList.Item>
              ) : null}
              <LabeledList.Item label={'Body Temperature'}>
                {body_temperature}
              </LabeledList.Item>
              <LabeledList.Item label={'Pulse'}>{pulse}</LabeledList.Item>
            </LabeledList>
          </Stack.Item>
        </Stack.Item>
      </Stack>
      {implants || hugged || core_fracture || (lung_ruptured && bodyscanner) ? (
        <Misc />
      ) : null}
    </Section>
  );
};

const ScannerOrgans = (props) => {
  const { data } = useBackend();
  const { damaged_organs, ui_mode } = data;

  return (
    <Section title={ui_mode ? null : 'Organ(s) Damaged'}>
      <LabeledList>
        {damaged_organs.map((organ) => (
          <LabeledList.Item
            key={organ.name}
            label={organ.name[0].toUpperCase() + organ.name.slice(1)}
          >
            <Box
              inline
              color={organ.status === 'Bruised' ? 'orange' : 'red'}
              bold={1}
            >
              {organ.status + ' [' + organ.damage + ' damage]'}
            </Box>
            <Box inline width={'5px'} />
            {organ.robotic ? (
              <Box inline bold={1} color="blue">
                Robotic
              </Box>
            ) : null}
          </LabeledList.Item>
        ))}
      </LabeledList>
    </Section>
  );
};
